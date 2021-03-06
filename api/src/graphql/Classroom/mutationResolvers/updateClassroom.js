// @flow

import type { ClassroomType, UpdateClassroomInput } from 'Types/ClassroomTypes'
import type { GraphQLContext } from 'Types/sharedTypes'

export const updateClassroom = async (
	_: any,
	{ input }: { input: UpdateClassroomInput },
	ctx: GraphQLContext,
): Promise<ClassroomType> => {
	if (!ctx.viewer)
		throw Error(
			'You must be logged in to create a new classroom. Please log in and try again.',
		)
	if (ctx.viewer.roles && !ctx.viewer.roles.includes('teacher'))
		throw new Error('You must be a teacher to create a classroom')

	const userClassrooms = await ctx.models.Classroom.getClassrooms(
		{ where: { classroomHasTeacher: { eq: ctx.viewer.uid } } },
		ctx.viewer,
	)
	const userClassroomUids = userClassrooms.map((u) => u.uid)
	if (userClassroomUids && !userClassroomUids.includes(input.uid))
		throw new Error('You can only modify classrooms that you teach in.')

	await ctx.models.Classroom.updateClassroom(input)
	const classroom = await ctx.models.Classroom.getClassroom(
		{ uid: input.uid },
		ctx.viewer,
	)
	if (!classroom) throw new Error('There was a problem updating your classroom')
	return classroom
}
