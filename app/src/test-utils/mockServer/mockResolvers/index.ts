import { Classroom, classroomConnection } from './Classroom'
import { User, teacherConnection, studentConnection } from './User'
import { MapNode, mapConnection } from './Map'

export { default as typeResolvers } from './typeResolvers'

export const mocks = {
	User,
	Classroom,
	Map: MapNode,
	// users: randomAmount({ min: 5, max: 12 }, generateUser(mostLikely('student')))
	Query: () => ({
		teachers: () => teacherConnection(5),
		students: () => studentConnection(15),
		classrooms: () => classroomConnection(5),
		maps: () => mapConnection(5),
	}),
}
