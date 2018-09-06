// @flow
import type { AssignUserInput } from 'Types/ClassroomTypes'
import type { UserType } from 'Types/UserTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { UserError } from 'Errors'

const debug = require('debug')('seed')

export const assignUserToClassroom = async (
	_: mixed,
	{ input }: { input: AssignUserInput },
	ctx: GraphQLContext,
): Promise<UserType> => {
	const { viewer } = ctx
	const { classroomUid, userUid } = input
	if (!viewer.roles.includes('teacher') && !viewer.roles.includes('admin')) {
		throw new UserError('You must be a teacher or admin to assign users to classrooms')
	}
	if (!viewer.roles.includes('admin')) {
		const teacherOwnsClassroom = await ctx.models.User.userTeachesInClassroom(viewer.uid, classroomUid)
		if (!teacherOwnsClassroom) throw new UserError('You can only assign students to classrooms you teach in')
	}
	let user = await ctx.models.User.getUser({ uid: userUid })
	if (!user) throw new UserError('The user you are trying to assign to this classroom does not exist')
	const { Classroom } = ctx.models
	const assign = user.roles.includes('teacher') ? Classroom.assignTeacher : Classroom.assignStudent
	const success = await assign(classroomUid, userUid)
	if (success) debug(`Assigned user ${userUid} to classroom ${classroomUid}`)
	user = ctx.models.User.getUser({ uid: userUid })
	if (!user || user === null) throw new UserError('The user you are trying to assign to this classroom does not exist')
	// $FlowFixMe -- flow should know that user will be defined at this point..
	return user
}
