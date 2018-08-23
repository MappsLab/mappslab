// @flow
import type { ClassroomType, NewClassroomArgs } from 'Types/ClassroomTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { UserError } from 'Errors'

export const addClassroom = async (_: Object, { input }: NewClassroomArgs, ctx: GraphQLContext): Promise<ClassroomType> => {
	if (!ctx.viewer) throw new UserError('You must be logged in to create new maps. Please log in and try again.')
	const { teacherUid } = input
	const { roles } = ctx.viewer
	if (!roles.includes('teacher') || !roles.includes('admin'))
		throw new UserError('You must be an admin or teacher to create a classroom')
	if (teacherUid && !roles.includes('admin')) throw new UserError('You must be an admin to create classrooms for other teachers')
	const newClassroom = await ctx.models.Classroom.createClassroom(input)
	return newClassroom
}
