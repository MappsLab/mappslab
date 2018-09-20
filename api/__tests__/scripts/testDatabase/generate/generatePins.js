// @flow
import * as R from 'ramda'
import faker from 'faker'
// import { pins as defaultPins } from '../../../stubs/'
const defaultPins = []
// TODO: Seed with disabled users

const generatePin = (): Object => {
	const createdAt = faker.date.past(2)
	return {
		title: faker.commerce.productName(),
		// Salt Lake City area
		lat: faker.random.number({ max: 41, min: 40, precision: 0.00001 }).toFixed(7),
		lng: faker.random.number({ max: -111, min: -112, precision: 0.00001 }).toFixed(7),
		description: faker.lorem.sentences(2),
		createdAt,
	}
}

export const generatePins = (count: number): Array<mixed> => [...defaultPins, ...R.times(generatePin, count - defaultPins.length)]
