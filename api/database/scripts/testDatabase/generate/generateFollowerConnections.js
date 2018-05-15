// @flow

import faker from 'faker'

export const generateFollowerConnections = (userKeysList: Array<string>) => (user: UserType): UserType => {
	const friendCount = faker.random.number({ min: 0, max: userKeysList.length / 3 })
	return faker.helpers
		.shuffle(userKeysList)
		.slice(0, friendCount)
		.map((followedUid) => ({
			userUid: user.uid,
			followedUid,
			date: faker.date.past(),
		}))
}
