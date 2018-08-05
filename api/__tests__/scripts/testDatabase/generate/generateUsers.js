// @flow
import * as R from 'ramda'
import faker from 'faker'
import { mostLikely } from './utils'
import { users as defaultUsers } from '../fixtures'

// TODO: Seed with disabled users

const generateUser = (): Object => {
	const name = faker.name.findName()
	const createdAt = faker.date.past(2)
	return {
		name,
		email: faker.internet
			.email(name)
			.toLowerCase()
			.replace(/[.]+/, '.'),
		role: mostLikely('student', 'teacher'),
		createdAt,
		disabled: mostLikely(false, true),
		password: 'Password#1',
	}
}

export const generateUsers = (count: number): Array<mixed> => [
	...defaultUsers,
	...R.times(generateUser, count - defaultUsers.length),
]
