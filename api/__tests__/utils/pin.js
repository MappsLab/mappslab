// @flow

import faker from 'faker'
import type { PinType, NewPinData } from 'Types/PinTypes'
import type { UserType } from 'Types/UserTypes'
import Pin from 'Models/Pin'
import { request } from './db'
import { probably } from './faker'

/**
 * Pin Read
 */
export const getDBPins = Pin.getPins

const pinQuery = /* GraphQL */ `
	query GetPin($input: GetPinInput!) {
		getPin(input: $input) {
			uid
			title
			lat
			lng
			description
			owner {
				uid
				name
			}
			maps {
				edges {
					node {
						uid
						title
					}
				}
			}
		}
	}
`

export const getPin = async (uid: string): Promise<PinType> => {
	const variables = { uid }
	const result = await request(pinQuery, { variables })
	return result.data.user
}

/**
 * Pin Creation
 */

const generatePin = (): NewPinData => ({
	title: faker.commerce.productName(),
	// Salt Lake City Area
	lat: faker.random.number({ max: 41, min: 40, precision: 0.00001 }).toFixed(7),
	lng: faker.random.number({ max: -111, min: -112, precision: 0.00001 }).toFixed(7),
	description: faker.lorem.sentences(2),
	deleted: probably(false, true),
})

const createPinMutation = /* GraphQL */ `
	mutation CreatePin($input: NewPinInput!) {
		createPin(input: $input) {
			uid
			title
			lat
			lng
			description
		}
	}
`

export const createPin = async ({ input }: { input: NewPinData }, { viewer }: { viewer: UserType } = {}): Promise<PinType> => {
	const context = { viewer }
	const variables = { input }
	const result = await request(createPinMutation, { variables, context })
	return result.data.createPin
}

export const createGeneratedPin = (pinArgs: { addToMaps: Array<string> }, { viewer }: { viewer: UserType }) =>
	createPin(
		{
			input: {
				...generatePin(),
				...pinArgs,
			},
		},
		{ viewer },
	)
