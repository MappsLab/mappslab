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

export const extractId = (parent, args) => R.path(['cursor'])(parent) || R.path(['input', 'id'])(args)

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
