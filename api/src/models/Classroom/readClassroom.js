// @flow
import { head } from 'ramda'
import { query } from 'Database'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { ViewerType } from 'Types/UserTypes'
import type { GetNodeArgs, PaginationFilterArgs } from 'Types/sharedTypes'
import { validateUid, createQueryStrings } from 'Database/utils'
import { publicFields } from './classroomDBSchema'

const debug = require('debug')('api')

export const getClassroom = async (
	args: GetNodeArgs,
	viewer?: ViewerType,
): Promise<ClassroomType | null> => {
	const key = head(Object.keys(args))
	if (!key || (key !== 'slug' && key !== 'uid'))
		throw new Error('getClassroom must be called with a `uid` or a `slug`')
	if (typeof args.uid === 'string' && key === 'uid' && !validateUid(args.uid))
		throw new Error(`Uid ${args.uid} is malformed`)
	const func =
		key === 'uid' && typeof args.uid === 'string'
			? `uid(${args.uid})`
			: `eq(${key}, $${key})`
	const q = /* GraphQL */ `
		query getClassroom($${key}: string, $viewerUid: string) {
			getClassroom(func: ${func}) {
				${publicFields}
			}
		}
	`
	const variables = { viewerUid: viewer ? viewer.uid : '0x1', ...args }
	const result = await query(q, variables)
	const classroom = head(result.getClassroom)

	if (!classroom || classroom.type !== 'classroom') return null
	return classroom
}

export const getClassrooms = async (
	args?: PaginationFilterArgs = {},
	viewer: ViewerType,
): Promise<Array<ClassroomType>> => {
	const { varBlocks, filterString, paginationString } = createQueryStrings(args)
	const q = /* GraphQL */ `
		query getClassrooms($viewerUid: string) {
			${varBlocks}
			classrooms(func: eq(type, "classroom") ${paginationString} ) ${filterString} {
				${publicFields}
			}
		}
	`
	const variables = { viewerUid: viewer ? viewer.uid : '0x1' }
	const result: Object = await query(q, variables).catch((err) => {
		debug('Error in getClassrooms:')
		debug(err)
		throw err
	})

	return result.classrooms || []
}
