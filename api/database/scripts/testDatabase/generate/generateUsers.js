// @flow
import * as R from 'ramda'
import faker from 'faker'
import { probably, probablyNot } from './utils'
import { users as defaultUsers } from '../../../stubs/'

// TODO: Seed with disabled users

const locales = ['en', 'de', 'jp', 'us']

const generateUser = (): Object => {
	const name = faker.name.findName()
	const joinDate = faker.date.past(2)
	return {
		displayName: name,
		email: faker.internet
			.email(name)
			.toLowerCase()
			.replace(/[.]+/, '.'),
		bioLine: faker.company.catchPhrase(),
		username: faker.internet.userName(name).replace(/\./g, '-'),
		joinDate,
		locale: faker.helpers.shuffle(locales)[0],
		website: probably(faker.internet.url(), undefined),
		disabled: probablyNot(true, false),
	}
}

export const generateUsers = (count: number): Array<mixed> => [...defaultUsers, ...R.times(generateUser, count)]
