import { randomAmount, probably, probablyNot, mostLikely, generateUser, generateClassroom } from 'Shared/mockGenerators'
export { default as typeResolvers } from './typeResolvers'

export const mocks = {
	User: generateUser(mostLikely('student')),
	Classroom: generateClassroom,
	// users: randomAmount({ min: 5, max: 12 }, generateUser(mostLikely('student')))
	teachers: () => randomAmount({ min: 5, max: 12 }, generateUser('teacher')),
	students: () => randomAmount({ min: 5, max: 12 }, generateUser('student')),
	classrooms: () => randomAmount({ min: 5, max: 12 }, generateClassroom),
}
