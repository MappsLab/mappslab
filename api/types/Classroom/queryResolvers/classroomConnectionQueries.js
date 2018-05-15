// @flow
import { getTeachers, getStudents } from '../ClassroomModel'
import type { PaginationArgs, PageType } from '../../shared/sharedTypes'
import type { ClassroomType } from '../ClassroomTypes'

export const studentsConnection = async (fetchedClassroom: ClassroomType, args: PaginationArgs): Promise<PageType | Error> => {}
export const teachersConnection = async (fetchedClassroom: ClassroomType, args: PaginationArgs): Promise<PageType | Error> => {
	const { edges, pageInfo } = await getTeachers(fetchedClassroom, args)

	return {
		edges,
		pageInfo,
	}
}
