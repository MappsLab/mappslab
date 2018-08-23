// @flow
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { DBEdge } from 'Types/database'
import { ValidationError } from 'Errors'
import { createNodeWithEdges, createEdge } from 'Database'
import { clean, defaultValues, validateNew } from './classroomDBSchema'

const debug = require('debug')('api:user')

type ClassroomEdge = DBEdge & {
	pred: 'teaches_in' | 'learns_in',
}

export const createClassroom = async (classroomData: ClassroomType, teacherUid: string): Promise<ClassroomType | void> => {
	const cleaned = await clean({ ...defaultValues, ...classroomData, createdAt: new Date() })
	const validatedClassroomData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	// $FlowFixMe -- TODO: How to type a generic function to return a specific type?
	return createNodeWithEdges(validatedClassroomData, [[{ fromUid: teacherUid, pred: 'teaches_in' }]])
}

export const createClassroomConnection = async (connection: ClassroomEdge): Promise<boolean | Error> => createEdge(connection, {})
