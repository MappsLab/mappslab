import { request } from './utils/db'
import { createGeneratedPin } from './utils/pin'
import { getDBUsers, getUser } from './utils/user'

let student1
let student2
let admin

beforeAll(async (done) => {
	const users = await getDBUsers()
	student1 = await getUser(users.find((u) => u.roles.includes('student')).uid)
	student2 = await getUser(
		users.find((u) => u.roles.includes('student') && u.uid !== student1.uid)
			.uid,
	)
	admin = await getUser(users.find((u) => u.roles.includes('admin')).uid)
	done()
})

const mutation = /* GraphQL */ `
	mutation DeletePin($uid: String!) {
		deletePin(input: { uid: $uid }) {
			success
			messages
		}
	}
`

const createPin = async (user) => {
	const firstMapUid = user.classrooms.edges[0].node.maps.edges[0].node.uid
	const newPin = await createGeneratedPin(
		{ addToMaps: [firstMapUid] },
		{ viewer: user },
	)
	return newPin
}

describe('[deletePin]', () => {
	it('should successfully delete a pin', async () => {
		// Create a new pin to delete
		const newPin = await createPin(student1)

		// Delete the pin
		const variables = {
			uid: newPin.uid,
		}
		const context = {
			viewer: student1,
		}
		const result = await request(mutation, { variables, context })
		expect(result.data.deletePin.success).toBe(true)
		// Make sure it no longer exists
		const q = /* GraphQL */ `
			query GetPin($uid: String!) {
				pin(input: { uid: $uid }) {
					uid
					title
				}
			}
		`
		const queryVars = {
			uid: newPin.uid,
		}
		const queryResult = await request(q, { variables: queryVars })

		expect(queryResult.data.pin).toBe(null)
	})

	it('should only allow owners to remove their pins', async () => {
		const student1pinUid = student1.pins.edges[0].node.uid
		const variables = {
			uid: student1pinUid,
		}
		const context = {
			viewer: student2,
		}
		const result = await request(mutation, { variables, context })
		expect(result.errors).toMatchSnapshot()
	})

	it('should allow admins to remove any pin', async () => {
		const newPin = await createPin(student1)

		// Delete the pin
		const variables = {
			uid: newPin.uid,
		}
		const context = {
			viewer: admin,
		}
		const result = await request(mutation, { variables, context })
		expect(result.data.deletePin.success).toBe(true)

		// Make sure it no longer exists
		const q = /* GraphQL */ `
			query GetPin($uid: String!) {
				pin(input: { uid: $uid }) {
					uid
					title
				}
			}
		`
		const queryVars = {
			uid: newPin.uid,
		}
		const queryResult = await request(q, { variables: queryVars })

		expect(queryResult.data.pin).toBe(null)
	})
})
