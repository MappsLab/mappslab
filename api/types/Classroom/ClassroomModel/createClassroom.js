// @flow
import type { ClassroomType } from '../ClassroomTypes'
import { clean, defaultValues, validateNew } from './classroomDBSchema'
import { ValidationError } from '../../../errorTypes'
import { createNode, createEdge } from '../../../database'
import type { DBEdge } from '../../shared/sharedTypes'

const debug = require('debug')('api:user')

export const createClassroom = async (classroomData: ClassroomType): Promise<ClassroomType | void> => {
	const cleaned = await clean({ ...defaultValues, ...classroomData, createdAt: new Date() })
	const validatedClassroomData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	return createNode(validatedClassroomData)
}

type ClassroomEdge = DBEdge & {
	pred: 'teaches_in' | 'learns_in',
}

export const createClassroomConnection = async (connection: ClassroomEdge): Promise<boolean | Error> => createEdge(connection)
