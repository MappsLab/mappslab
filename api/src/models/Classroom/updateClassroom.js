// @flow
import type { ClassroomType, UpdateClassroomInput } from 'Types/ClassroomTypes'
import { mutateNode } from 'Database'
import { clean, validateUpdate } from './classroomDBSchema'

export const updateClassroom = async (args: UpdateClassroomInput): Promise<ClassroomType> => {
	const { uid, addStudents, addTeachers, addMaps, ...classroomData } = args
	const cleaned = await clean(classroomData)
	const validatedClassroomData = await validateUpdate(cleaned)
	console.log(args)
	const updatedClassroom = await mutateNode(uid, { data: validatedClassroomData })
	return updatedClassroom
}
