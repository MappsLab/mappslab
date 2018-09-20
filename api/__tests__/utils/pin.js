// @flow

import faker from 'faker'
import type { PinType, NewPinData } from 'Types/PinTypes'
import type { UserType } from 'Types/UserTypes'
import { request } from './db'

/**
 * Pin Creation
 */

const generatePin = (): NewPinData => ({
	title: faker.commerce.productName(),
	// Salt Lake City Area
	lat: faker.random.number({ max: 41, min: 40, precision: 0.00001 }).toFixed(7),
	lng: faker.random.number({ max: -111, min: -112, precision: 0.00001 }).toFixed(7),
	description: faker.lorem.sentences(2),
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
