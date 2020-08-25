import faker from 'faker'
import R from 'ramda'
import {
	MinMax,
	paginate,
	extractUid,
	slugify,
	deSlugify,
	generateUid,
} from './utils'
import { teacherConnection } from './User'
import { mapConnection } from './Map'

export const Classroom = (parent, args) => {
	const uid = extractUid(parent, args)
	const { input } = args
	const title =
		input && input.slug
			? deSlugify(input.slug)
			: `${faker.commerce.productAdjective()} ${faker.commerce.department()}`
	return {
		uid,
		slug: slugify(title),
		title,
		teachers: () => teacherConnection({ min: 1, max: 3 }),
		maps: () => mapConnection({ min: 1, max: 5 }),
		__typename: 'Classroom',
	}
}

// export const classroomConnection = (count?: nu)

export const getRandomClassroom = () =>
	Classroom(null, { input: { id: generateUid() } })

export const classroomConnection = (
	count: number | MinMax = { min: 1, max: 5 },
) => {
	const classroomCount =
		typeof count === 'number' ? count : faker.random.number(count)
	const classrooms = R.times(getRandomClassroom, classroomCount)
	return paginate(classrooms)
}
