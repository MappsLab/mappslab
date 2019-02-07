import * as R from 'ramda'
import faker from 'faker'

export const paginate = (nodes) => ({
	pageInfo: {
		hasNextPage: false, // todo, update this to actually work
		hasPrevPage: false,
	},
	edges: nodes.map((node) => ({
		cursor: node.id,
		node,
	})),
})

export const generateUid = () => `0x${faker.random.uuid().substr(0, 8)}`

export const extractUid = (parent, args) => R.path(['cursor'])(parent) || R.path(['input', 'uid'])(args) || generateUid()

export const generateRandomArray = (arr) => faker.helpers.shuffle(arr).slice(0, 3)

export const slugify = (text) =>
	text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')

const capitalize = (str) => {
	const [first, ...rest] = str.split('')
	return `${first.toUpperCase()}${rest.join('')}`
}

export const deSlugify = (text) =>
	text
		.split('-')
		.map(capitalize)
		.join(' ')

export const randomAmount = ({ max, min }: { max: number, min: number }, cb: Function): Array<mixed> => {
	if (!max) throw new Error('randomAmount({ max }): max has to be defined!')
	const n = faker.random.number({ min: min || 0, max })
	const result = []
	for (let i = 0; i < n; i += 1) {
		result.push(cb())
	}
	return result
}

export const probably = (positive: any, negative: any = null): any => (faker.random.number(100) > 25 ? positive : negative)
export const probablyNot = (positive: any, negative: any = null): any => probably(negative, positive)

export const mostLikely = (positive: any, negative: any = null): any => (faker.random.number(100) > 5 ? positive : negative)
export const mostLikelyNot = (positive: any, negative: any = null): any => mostLikely(negative, positive)
