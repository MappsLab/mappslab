// @flow

/**
 * Relationships
 */

const genericRelationship = (predicate: string) => (operator: 'eq' | 'notEq', uid: string) => {
	if (operator !== 'eq' && operator !== 'notEq')
		throw new Error(`"${operator}" is an invalid operator. Relationship operator may only be "eq" or "notEq"`)
	const maybeNot = operator === 'notEq' ? 'NOT ' : ''
	return `${maybeNot}uid_in(${predicate}, ${uid})`
}

// User-first relationships
export const userTeachesIn = genericRelationship('teaches_in')
export const userLearnsIn = genericRelationship('learns_in')

// Classroom-first relationships
export const classroomHasStudent = genericRelationship('~learns_in')
export const classroomHasTeacher = genericRelationship('~teaches_in')

// Pin-first relationships
export const pinnedByUser = genericRelationship('~pinned')
export const pinnedInMap = genericRelationship('~has_pin')
