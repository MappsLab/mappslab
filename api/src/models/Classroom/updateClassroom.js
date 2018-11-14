// @flow
import type { ClassroomType, UpdateClassroomInput } from 'Types/ClassroomTypes'
import { mutateNode } from 'Database'
import { clean, validateUpdate } from './classroomDBSchema'

export const updateClassroom = async (args: UpdateClassroomInput): Promise<ClassroomType> => {
	const { uid, ...classroomData } = args
	const cleaned = await clean(classroomData)
	const validatedClassroomData = await validateUpdate(cleaned)
	const updatedClassroom: ClassroomType = await mutateNode(uid, validatedClassroomData)
	return updatedClassroom
}
