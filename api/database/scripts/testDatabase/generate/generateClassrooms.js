// @flow
import * as R from 'ramda'
import faker from 'faker'
import { mostLikely } from './utils'
import defaultClassrooms from '../../../stubs/classrooms'
import type { UserType } from '../../../../types/User/UserTypes'
import type { ClassroomType } from '../../../../types/Classroom/ClassroomTypes'
import type { DBEdge } from '../../../../types/shared/sharedTypes'

// TODO: Seed with disabled users

const generateClassroom = (): Object => {
	const classroomName = `${faker.commerce.productAdjective()} ${faker.commerce.department()}`
	const createdAt = faker.date.past(2)
	return {
		classroomName,
		createdAt,
	}
}

export const generateClassrooms = (count: number): Array<mixed> => [
	...defaultClassrooms,
	...R.times(generateClassroom, count - defaultClassrooms.length),
]

export const generateClassroomConnections = (users: Array<UserType>, classrooms: Array<ClassroomType>): Array<DBEdge> => {
	const { student, teacher } = R.groupBy(R.prop('role'), users)
	const teacherEdges = R.flatten(
		teacher.map((t, i) => classrooms.slice(i * 2, i * 2 + 2).map((c) => ({ fromUid: t.uid, pred: 'teaches_in', toUid: c.uid }))),
	)

	const unAssignedStudents = [...student]

	const studentEdges = []
	while (unAssignedStudents.length) {
		classrooms
			.map((c) => {
				if (unAssignedStudents.length === 0) return null
				const s = unAssignedStudents.splice(0, 1)[0]
				studentEdges.push({ fromUid: s.uid, pred: 'learns_in', toUid: c.uid })
			})
			.filter((a) => a)
	}

	return [...teacherEdges, ...studentEdges]
}
