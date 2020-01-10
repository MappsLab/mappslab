// @flow
import type { ClassroomType, UpdateClassroomInput } from 'Types/ClassroomTypes'
import { mutateNode, createEdge } from 'Database'
import { clean, validateUpdate } from './classroomDBSchema'

export const updateClassroom = async (
	args: UpdateClassroomInput,
): Promise<ClassroomType> => {
	const { uid, addStudents, addTeachers, addMaps, ...classroomData } = args
	const cleaned = await clean(classroomData)
	const validatedClassroomData = await validateUpdate(cleaned)

	const addStudentEdges =
		addStudents && addStudents.length
			? addStudents.map((studentUid) => [
					{
						fromUid: studentUid,
						pred: 'learns_in',
						toUid: uid,
					},
					{},
			  ])
			: []

	const addTeacherEdges =
		addTeachers && addTeachers.length
			? addTeachers.map((teacherUid) => [
					{
						fromUid: teacherUid,
						pred: 'teaches_in',
						toUid: uid,
					},
					{},
			  ])
			: []

	const addMapEdges =
		addMaps && addMaps.length
			? addMaps.map((mapUid) => [
					{
						fromUid: uid,
						pred: 'has_map',
						toUid: mapUid,
					},
					{},
			  ])
			: []

	const addEdges = [...addStudentEdges, ...addTeacherEdges, ...addMapEdges]
	if (addEdges.length)
		await Promise.all(
			addEdges.map(([edge, config]) => createEdge(edge, config)),
		)

	const updatedClassroom = await mutateNode(uid, {
		data: validatedClassroomData,
	})
	return updatedClassroom
}
