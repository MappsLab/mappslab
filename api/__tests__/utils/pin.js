// @flow

import faker from 'faker'
import type { NewPinData } from 'Types/PinTypes'
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
	createdAt: faker.date.past(2),
})
