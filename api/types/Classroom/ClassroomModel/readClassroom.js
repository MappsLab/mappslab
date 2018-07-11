// @flow
import { head } from 'ramda'
import { query } from '../../../database'
import type { ClassroomType } from '../ClassroomTypes'
import type { UserType } from '../../User/UserTypes'
import type { PaginationArgs, GetNodeArgs } from '../../shared/sharedTypes'
import { publicFields } from './classroomDBSchema'
import { validateUid } from '../../../database/utils'

const debug = require('debug')('api')

export const getClassroom = async (args: GetNodeArgs): Promise<ClassroomType | null | Error> => {
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
	if (classroom.type !== 'classroom') return null
	return classroom
}

export const getClassrooms = async (args?: PaginationArgs): Promise<Array<ClassroomType>> => {
	// const { first, after, filter } = makePaginationArgs(args)
	// const filterString = filter ? createFilterString(filter) : ''
	const filterString = ''
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
