// @flow
import type { FilterStrings } from '../dbUtils'

/**
 * Relationships
 */

type FilterTuple = [string, ?string]

const genericRelationship = (predicate: string) => (operator: 'eq' | 'notEq', uid: string): FilterTuple => {
	if (operator !== 'eq' && operator !== 'notEq')
		throw new Error(`"${operator}" is an invalid operator. Relationship operator may only be "eq" or "notEq"`)
	const maybeNot = operator === 'notEq' ? 'NOT ' : ''
	return [`${maybeNot}uid_in(${predicate}, ${uid})`, '']
}

const routeWithinMap = (operator: 'eq' | 'notEq', uid: string): FilterTuple => {
	const varBlock = `
		var(func: uid(${uid})) {    
			has_pin {
				MAP_PINS as ~includes_pin
			}
		}
	`
	const filterString = `uid(MAP_PINS)`

	return [filterString, varBlock]
}

const relationshipStringCreators = {
	// User-first relationships
	userTeachesIn: genericRelationship('teaches_in'),
	userLearnsIn: genericRelationship('learns_in'),

	// Classroom-first relationships
	classroomHasStudent: genericRelationship('~learns_in'),
	classroomHasTeacher: genericRelationship('~teaches_in'),

	// Pin-first relationships
	pinnedByUser: genericRelationship('~pinned'),
	pinnedInMap: genericRelationship('~has_pin'),
	pinWithinRoute: genericRelationship('~includes_pin'),

	// Route-first relationships
	routeContainsPin: genericRelationship('includes_pin'),
	routeWithinMap,
}

const createRelationshipFilter = (operator: string, field: string, value: any): FilterStrings | void => {
	// If the field is not a relationship field, return undefined so we
	// can create a field filter
	if (!relationshipStringCreators[field]) return undefined
	const [filterString, varBlocks] = relationshipStringCreators[field](operator, value)
	return {
		varBlocks,
		filterString,
	}
}

export default createRelationshipFilter
