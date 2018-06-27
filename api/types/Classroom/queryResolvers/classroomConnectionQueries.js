// @flow
import { getTeachers, getStudents } from '../ClassroomModel'
import type { PaginationInput, PageType } from '../../shared/sharedTypes'
import type { ClassroomType } from '../ClassroomTypes'
import { assemblePage } from '../../../utils/graphql'

export const studentsConnection = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
): Promise<PageType | Error> => {
	const fetchedUsers = await getStudents(fetchedClassroom, input)
	return assemblePage(fetchedUsers, input)
}

export const teachersConnection = async (
	fetchedClassroom: ClassroomType,
	{ input }: PaginationInput,
): Promise<PageType | Error> => {
	const fetchedUsers = await getTeachers(fetchedClassroom, input)
	return assemblePage(fetchedUsers, input)
}
