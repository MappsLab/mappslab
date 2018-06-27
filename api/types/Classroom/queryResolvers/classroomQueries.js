// @flow

import { getClassroom, getClassrooms } from '../ClassroomModel'
import type { ClassroomType } from '../ClassroomTypes'
import type { PageType, GetNodeInput, PaginationInput } from '../../shared/sharedTypes'
import { assemblePage } from '../../../utils/graphql'

export const classroom = (_: Object, { input }: GetNodeInput): Promise<ClassroomType | null | Error> => getClassroom(input)

export const classrooms = async (_: Object, { input }: PaginationInput): Promise<PageType | null | Error> => {
	const fetchedClassrooms = await getClassrooms(input).catch((err) => {
		throw err
	})
	return assemblePage(fetchedClassrooms, input)
}
