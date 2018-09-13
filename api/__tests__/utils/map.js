// @flow
import faker from 'faker'
import type { MapType, NewMapData } from 'Types/MapTypes'
import type { UserType } from 'Types/UserTypes'
import { request } from './db'

/**
 * Map Creation
 */

const generateMap = (): NewMapData => ({
	title: faker.commerce.productName(),
	// Salt Lake City area
	description: faker.lorem.paragraph(),
})

const createMapMutation = /* GraphQL */ `
	mutation createMap($input: NewMapInput!, $classroomUid: String!) {
		createMap(input: $input, classroomUid: $classroomUid) {
			uid
			title
			description
			classroom {
				uid
			}
		}
	}
`

export const createMap = async (
	args: { input?: NewMapData, classroomUid: string },
	{ viewer }: { viewer: UserType } = {},
): Promise<MapType> => {
	const input = args.input || generateMap()
	const context = { viewer }
	const variables = { ...args, input }
	const result = await request(createMapMutation, { variables, context })
	return result.data.createMap
}
