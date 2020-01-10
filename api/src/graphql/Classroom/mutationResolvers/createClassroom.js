// @flow
import type { ClassroomType, NewClassroomArgs } from 'Types/ClassroomTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { UserError } from 'Errors'

export const createClassroom = async (
	_: Object,
	{ input, assignTeachers }: NewClassroomArgs,
	ctx: GraphQLContext,
): Promise<ClassroomType> => {
	const { viewer } = ctx
	if (!viewer)
		throw new UserError(
			'You must be logged in to create new maps. Please log in and try again.',
		)
	if (!viewer.roles.includes('teacher') && !viewer.roles.includes('admin')) {
		throw new UserError(
			'You must be a teacher or admin to create a new classroom.',
		)
	}
	if (assignTeachers && !viewer.roles.includes('admin'))
		throw new UserError(
			'You must be an admin to create classrooms for other teachers',
		)
	const newClassroom = await ctx.models.Classroom.createClassroom(input)
	if (viewer.roles.includes('teacher')) {
		await ctx.models.Classroom.assignTeacher(newClassroom.uid, viewer.uid)
	}
	if (viewer.roles.includes('admin') && assignTeachers) {
		await Promise.all(
			assignTeachers.map((t) => () =>
				ctx.models.Classroom.assignTeacher(newClassroom.uid, t),
			),
		)
	}
	return newClassroom
}
