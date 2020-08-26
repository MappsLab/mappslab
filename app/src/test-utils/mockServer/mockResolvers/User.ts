import faker from 'faker'
import R from 'ramda'
import { MinMax, paginate, extractUid, generateUid, mostLikely } from './utils'
import { classroomConnection } from './Classroom'

export const generateUser = (role: string) => (parent, args) => {
	const uid = extractUid(parent, args)

	return {
		uid,
		name: faker.name.findName(),
		temporaryPassword: 'temporary',
		email: faker.internet
			.email()
			.toLowerCase()
			.replace(/[.]+/, '.'),
		roles: [role],
		classrooms: () => classroomConnection({ min: 1, max: 3 }),
		__typename: 'User',
	}
}

export const User = generateUser(mostLikely('student'))

const getRandomUser = () => User(null, { input: { id: generateUid() } })

export const userConnection = (count: number | MinMax = { min: 1, max: 5 }) => {
	const classroomCount =
		typeof count === 'number' ? count : faker.random.number(count)
	const classrooms = R.times(getRandomUser, classroomCount)
	return paginate(classrooms)
}

export const studentConnection = (
	count: number | MinMax = { min: 1, max: 5 },
) => {
	const studentCount =
		typeof count === 'number' ? count : faker.random.number(count)
	// @ts-ignore
	const students = R.times(generateUser('student'), studentCount)
	return paginate(students)
}

export const teacherConnection = (
	count: number | MinMax = { min: 1, max: 5 },
) => {
	const teacherCount =
		typeof count === 'number' ? count : faker.random.number(count)
	// @ts-ignore
	const teachers = R.times(generateUser('teacher'), teacherCount)
	return paginate(teachers)
}
