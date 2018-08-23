// @flow
export const joseph = {
	name: 'Joseph Thomas',
	roles: [{ role: 'admin' }],
	email: 'joseph@good-idea.studio',
	password: 'Password#1',
	disabled: false,
}

export const waverly = {
	name: 'Alex Johnstone',
	roles: [{ role: 'student' }],
	password: 'Password#1',
	disabled: false,
}

export const john = {
	name: 'Mr. Schaefer',
	roles: [{ role: 'teacher' }],
	password: 'Password#1',
	email: 'john@cmwworld.com',
}

const defaultUsers = [joseph, waverly, john]

export default defaultUsers
