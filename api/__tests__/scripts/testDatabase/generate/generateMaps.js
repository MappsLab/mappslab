// @flow
import * as R from 'ramda'
import faker from 'faker'
// import { pins as defaultPins } from '../../../stubs/'
const defaultMaps = []
// TODO: Seed with disabled users

const generateMap = (): Object => {
	const createdAt = faker.date.past(2)
	return {
		title: faker.commerce.productName(),
		// Salt Lake City area
		description: faker.lorem.paragraph(),
		createdAt,
	}
}

export const generateMaps = (count: number): Array<mixed> => [
	...defaultMaps,
	...R.times(generateMap, Math.max(0, count - defaultMaps.length)),
]
