// @flow
import type { ClassroomType, NewClassroomInput } from 'Types/ClassroomTypes'
import type { DBEdge } from 'Types/database'
import { ValidationError } from 'Errors'
import { createNodeWithEdges, createEdge } from 'Database'
import { clean, defaultValues, validateNew } from './classroomDBSchema'

const debug = require('debug')('api:user')

type ClassroomEdge = DBEdge & {
	pred: 'teaches_in' | 'learns_in',
}

export const createClassroom = async (
	args: NewClassroomInput,
): Promise<ClassroomType> => {
	const { addTeachers, ...classroomData } = args
	const cleaned = await clean({
		...defaultValues,
		...classroomData,
		createdAt: new Date(),
	})
	const validatedClassroomData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})

	const addTeacherEdges =
		addTeachers && addTeachers.length
			? addTeachers.map((teacherUid) => [
					{
						fromUid: teacherUid,
						pred: 'teaches_in',
					},
					{},
			  ])
			: []
	// $FlowFixMe --
	return createNodeWithEdges(validatedClassroomData, [...addTeacherEdges])
}

const createClassroomConnection = async (
	connection: ClassroomEdge,
): Promise<boolean> => createEdge(connection, {})

export const assignStudent = (classroomUid: string, studentUid: string) =>
	createClassroomConnection({
		fromUid: studentUid,
		pred: 'learns_in',
		toUid: classroomUid,
	})

export const assignTeacher = (classroomUid: string, teacherUid: string) =>
	createClassroomConnection({
		fromUid: teacherUid,
		pred: 'teaches_in',
		toUid: classroomUid,
	})
