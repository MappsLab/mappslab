// @flow

import faker from 'faker'

export const randomAmount = ({ max, min }: { max: number, min: number }, cb: Function): Array<mixed> => {
	if (!max) throw new Error('randomAmount({ max }): max has to be defined!')
	const n = faker.random.number({ min: min || 0, max })
	const result = []
	for (let i = 0; i < n; i += 1) {
		result.push(cb(i))
	}
	return result
}

export const probably = (positive: any, negative: any = null): any => (faker.random.number(100) > 20 ? positive : negative)
export const probablyNot = (positive: any, negative: any = null): any => probably(negative, positive)
