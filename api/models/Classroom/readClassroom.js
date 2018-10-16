// @flow
import { head } from 'ramda'
import { query } from 'Database'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { GetNodeArgs, PaginationArgs } from 'Types/sharedTypes'
import { validateUid, makeFilterString, makePaginationString } from 'Database/utils'
import { publicFields } from './classroomDBSchema'

const debug = require('debug')('api')

export const getClassroom = async (args: GetNodeArgs): Promise<ClassroomType | null> => {
	const key = head(Object.keys(args))
	if (!key || (key !== 'slug' && key !== 'uid')) throw new Error('getClassroom must be called with a `uid` or a `slug`')
	if (typeof args.uid === 'string' && key === 'uid' && !validateUid(args.uid)) throw new Error(`Uid ${args.uid} is malformed`)
	const func = key === 'uid' && typeof args.uid === 'string' ? `uid(${args.uid})` : `eq(${key}, $${key})`
	const q = /* GraphQL */ `
		query getClassroom($${key}: string) {
			getClassroom(func: ${func}) {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q, args)
	const classroom = head(result.getClassroom)
	if (!classroom || classroom.type !== 'classroom') return null
	return classroom
}

export const getClassrooms = async (args?: PaginationArgs = {}): Promise<Array<ClassroomType>> => {
	const { first, after, filter } = args
	const filterString = makeFilterString(filter)
	const paginationString = makePaginationString(first, after)
	const q = /* GraphQL */ `
		query getClassrooms {
			classrooms(func: eq(type, "classroom") ${paginationString} ) ${filterString} {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q).catch((err) => {
		debug('Error in getClassrooms:')
		debug(err)
		throw err
	})

	return result.classrooms || []
}
