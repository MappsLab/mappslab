// @flow
import faker from 'faker'
import * as R from 'ramda'
import { extractId, paginate } from './utils'
import type { MinMax } from './types'

export const Avatar = () => ({ url: faker.image.imageUrl() })

export const User = (parent, args) => {
	const id = extractId(parent, args)
	return {
		id,
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		isFollowedByViewer: faker.random.number({ min: 0, max: 10 }) > 7,
		email: faker.internet.email(),
		// bio: faker.hacker.phrase(),
		roles: ['student'],
		__typename: 'User',
		// connections
	}
}

export const getRandomUser = () => User(null, { input: { id: faker.random.number({ min: 1, max: 100 }) } })

export const userConnection = (count?: number | MinMax = { min: 1, max: 5 }) => {
	const userCount = typeof count === 'number' ? count : faker.random.number(count)
	const users = R.times(getRandomUser, userCount)
	return paginate(users)
}
