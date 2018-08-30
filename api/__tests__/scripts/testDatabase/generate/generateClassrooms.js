// @flow
import * as R from 'ramda'
import faker from 'faker'
import type { UserType } from 'Types/UserTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { DBEdge } from 'Types/database'
// import defaultClassrooms from '../fixtures/classrooms'

// TODO: Seed with disabled users

const generateClassroom = (): Object => {
	const title = `${faker.commerce.productAdjective()} ${faker.commerce.department()}`
	const createdAt = faker.date.past(2)
	return {
		title,
		createdAt,
	}
}

export const generateClassrooms = (count: number): Array<mixed> => [...R.times(generateClassroom, count)]

export const generateClassroomConnections = (students: Array<UserType>, classrooms: Array<ClassroomType>): Array<DBEdge> => {
	const unAssignedStudents = [...students]

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

	return [...studentEdges]
}
