// @flow
import faker from 'faker'
import type { MapType, NewMapData } from 'Types/MapTypes'
import type { UserType } from 'Types/UserTypes'
import Map from 'Models/Map'
import { request } from './db'

/**
 * Map Read
 */

export const getDBMaps = Map.getMaps

/**
 * Map Creation
 */

const generateMap = (): NewMapData => ({
	title: faker.commerce.productName(),
	// Salt Lake City area
	description: faker.lorem.paragraph(),
})

const createMapMutation = /* GraphQL */ `
	mutation createMap($input: NewMapInput!) {
		createMap(input: $input) {
			uid
			title
			description
			classroom {
				uid
			}
		}
	}
`

export const createMap = async ({ input }: { input: NewMapData }, { viewer }: { viewer: UserType } = {}): Promise<MapType> => {
	const variables = { input }
	const context = { viewer }
	const result = await request(createMapMutation, { variables, context })
	return result.data.createMap
}

export const createGeneratedMap = (mapArgs: { classroomUid: string }, { viewer }: { viewer: UserType }) =>
	createMap({ input: { ...generateMap(), ...mapArgs } }, { viewer })
