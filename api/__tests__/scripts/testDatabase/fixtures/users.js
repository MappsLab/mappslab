// @flow
export const joseph = {
	name: 'Joseph Thomas',
	roles: ['admin'],
	email: 'joseph@good-idea.studio',
	password: 'Password#1',
	disabled: false,
}

export const alex = {
	name: 'Alex Johnstone',
	roles: ['student'],
	temporaryPassword: 'temporary',
	disabled: false,
}

export const john = {
	name: 'Mr. Schaefer',
	roles: ['teacher'],
	password: 'Password#1',
	email: 'john@cmwworld.com',
}

const defaultUsers = [joseph, alex, john]

export default defaultUsers
