/* eslint-disable no-undef */
import { removeNode, removeEdge } from 'Database'
import { request } from './utils/db'
import { getDBUsers } from './utils/user'
import { getDBClassrooms } from './utils/classroom'

const q = /* GraphQL */ `
	mutation createMap($title: String!, $description: String, $classroomUid: String!) {
		createMap(input: { title: $title, description: $description, classroomUid: $classroomUid }) {
			uid
			title
			description
			classroom {
				uid
				title
			}
		}
	}
`
const mapsToRemove = []
let classrooms
const context = {}

const variables = {
	title: 'a new map',
	description: 'A great description for this new map',
}

beforeAll(async (done) => {
	const users = await getDBUsers()
	context.viewer = users[0]
	classrooms = await getDBClassrooms()
	done()
})

afterEach(async (done) => {
	if (mapsToRemove.length)
		mapsToRemove.map(async (map) => {
			if (map.classroom)
				await removeEdge({ fromUid: map.classroom.uid, pred: 'has_map', toUid: map.uid }).catch((e) => console.log(e))
			await removeNode(map.uid)
		})

	done()
})

describe('[createMap]', () => {
	it('should return an error if no classroom uid is specified', async () => {
		const result = await request(q, { variables, context })
		expect(result.errors).toMatchSnapshot()
	})

	it('should return an error if the viewer is not logged in', async () => {
		const vars = {
			...variables,
			classroomUid: 'bad-arg',
		}
		const result = await request(q, { variables: vars })
		expect(result.errors).toMatchSnapshot()
	})

	it('should return an error if the supplied uid is malformed', async () => {
		const vars = {
			...variables,
			classroomUid: 'bad-arg',
		}
		const result = await request(q, { variables: vars, context })
		expect(result.errors).toMatchSnapshot()
	})

	// it('should return an error if the classroom does not exist', async () => {
	// TODO: Figure out how to handle this
	// 	const vars = {
	// 		...variables,
	// 		classroomUid: '0x123abc666xyz',
	// 	}
	// 	const result = await request(q, { variables: vars, context })
	// 	expect(result.errors).toMatchSnapshot()
	// })

	it('Should add a new map', async () => {
		const vars = {
			...variables,
			classroomUid: classrooms[0].uid,
		}
		const result = await request(q, { variables: vars, context })
		expect(result.data.createMap.title).toBe(variables.title)
		expect(result.data.createMap.classroom.title).toBe(classrooms[0].title)
		mapsToRemove.push(result.data.createMap)
	})

	it.skip('should deny permission to users without admin or teacher roles', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should disallow teachers from create maps in classrooms they do not teach in', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
