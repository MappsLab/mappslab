// @flow
import { prop, head, pipe } from 'ramda'
import { query } from '../../../database'
import type { ClassroomType } from '../ClassroomTypes'
import type { UserType } from '../../User/UserTypes'
import type { PaginationArgs, GetNodeArgs } from '../../shared/sharedTypes'
import { publicFields } from './classroomDBSchema'
import { createFilterString, makePaginationArgs } from '../../../database/utils'

const debug = require('debug')('api')

export const getClassroom = async (args: GetNodeArgs): Promise<ClassroomType | Error> => {
	const key = head(Object.keys(args))
	if (!key) throw new Error('getClassroom must be called with a `uid` or a `slug`')
	const func = key === 'uid' && typeof args.uid === 'string' ? `uid(${args.uid})` : `eq(${key}, $${key})`
	const q = /* GraphQL */ `
		query getClassroom($${key}: string) {
			getClassroom(func: ${func}) {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q, args)
	return head(result.getClassroom)
}

export const getClassrooms = async (args?: PaginationArgs): Promise<Array<ClassroomType>> => {
	const { first, after, filter } = makePaginationArgs(args)
	const filterString = filter ? createFilterString(filter) : ''
	const q = /* GraphQL */ `
		query getClassrooms {
			classrooms(func: eq(type, "classroom")) ${filterString} {
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

export const getClassroomsByUser = async (user: UserType, args?: PaginationArgs): Promise<Array<ClassroomType> | Error> => {
	const q = /* GraphQL */ `
		query getClassroomsByUser {
			classrooms(func: eq(type, "classroom")) @filter(uid_in(~learns_in, ${user.uid})) {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q)
	return result.classrooms || []
}
