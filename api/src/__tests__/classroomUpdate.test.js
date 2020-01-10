import { request } from './utils/db'
import { getDBUsers } from './utils/user'
import { getDBClassrooms } from './utils/classroom'

let classroom
let teacher
let otherTeacher
let student

const query = /* GraphQL */ `
	query classroom($uid: String!) {
		classroom(input: { uid: $uid }) {
			uid
			title
			description
			teachers {
				edges {
					cursor
					node {
						uid
						name
						roles
					}
				}
			}
		}
	}
`

beforeAll(async (done) => {
	const firstClassrooms = await getDBClassrooms()
	const result = await request(query, {
		variables: { uid: firstClassrooms[0].uid },
	})
	// eslint-disable-next-line
	classroom = result.data.classroom
	const users = await getDBUsers()
	const classroomTeachers = classroom.teachers.edges.map((edge) => edge.node)
	// eslint-disable-next-line
	teacher = classroomTeachers[0]
	otherTeacher = users.find(
		(u) =>
			u.roles.includes('teacher') &&
			!classroomTeachers.find((ct) => ct.uid === u.uid),
	)
	student = users.find(
		(u) => !u.roles.includes('teacher') && u.roles.includes('student'),
	)
	done()
})

const mutation = /* GraphQL */ `
	mutation UpdateClassroom(
		$uid: String!
		$title: String
		$description: String
	) {
		updateClassroom(
			input: { uid: $uid, title: $title, description: $description }
		) {
			uid
			title
			description
		}
	}
`

const getVariables = () => ({
	uid: classroom.uid,
	description: 'a new description',
})

describe('[updateClassroom]', () => {
	it('should return an error if there is no current viewer', async () => {
		const variables = getVariables()
		const result = await request(mutation, { variables })
		expect(result.errors).toMatchSnapshot()
	})

	it('should return an error if the user is not a teacher', async () => {
		const variables = getVariables()
		const context = { viewer: student }
		const result = await request(mutation, { variables, context })
		expect(result.errors).toMatchSnapshot()
	})

	it('should return an error if the teacher does not own the classroom', async () => {
		const variables = getVariables()
		const context = { viewer: otherTeacher }
		const result = await request(mutation, { variables, context })
		expect(result.errors).toMatchSnapshot()
	})

	it('should properly update a classroom', async () => {
		const original = await request(query, { variables: { uid: classroom.uid } })
		const originalDescription = original.data.classroom.description
		const originalTitle = original.data.classroom.title
		const variables = getVariables()
		const context = { viewer: teacher }
		const result = await request(mutation, { variables, context })
		expect(result.data.updateClassroom.description).toBe(variables.description)
		expect(result.data.updateClassroom.title).toBe(originalTitle)
		const restore = await request(mutation, {
			variables: { ...variables, description: originalDescription },
			context,
		})
		expect(restore.data.updateClassroom.description).toBe(originalDescription)
		expect(result.data.updateClassroom.title).toBe(originalTitle)
	})
})
