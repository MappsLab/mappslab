import faker from 'faker'

export * from './utils'

faker.seed(667)

const generateUid = () => `0x${faker.random.uuid().substr(0, 8)}`

export const generateClassroom = () => ({
	uid: generateUid(),
	title: `${faker.commerce.productAdjective()} ${faker.commerce.department()}`,
	description: faker.lorem.paragraphs(),
})

export const generateUser = (role) => () => ({
	uid: generateUid(),
	name: faker.name.findName(),
	temporaryPassword: 'temporary',
	email: faker.internet
		.email()
		.toLowerCase()
		.replace(/[.]+/, '.'),
	roles: [role],
})
