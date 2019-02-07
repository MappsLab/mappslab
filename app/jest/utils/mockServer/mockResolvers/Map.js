// @flow
import faker from 'faker'
import R from 'ramda'
import { paginate, extractUid, slugify, deSlugify, generateUid } from './utils'
import type { MinMax } from './utils'
import { classroomConnection } from './Classroom'

export const MapNode = (parent, args) => {
	const uid = extractUid(parent, args)
	const { input } = args
	const title =
		input && input.slug ? deSlugify(input.slug) : `${faker.commerce.productAdjective()} ${faker.commerce.department()}`
	return {
		uid,
		slug: slugify(title),
		title,
		classrooms: () => classroomConnection(1),
		__typename: 'Map',
	}
}

// export const classroomConnection = (count?: nu)

export const getRandomClassroom = () => MapNode(null, { input: { id: generateUid() } })

export const mapConnection = (count?: number | MinMax = { min: 1, max: 5 }) => {
	const mapCount = typeof count === 'number' ? count : faker.random.number(count)
	const maps = R.times(getRandomClassroom, mapCount)
	return paginate(maps)
}
