// @flow
import { getTeachers, getStudents } from '../ClassroomModel'
import type { PaginationArgs, PageType } from '../../shared/sharedTypes'
import type { ClassroomType } from '../ClassroomTypes'

export const studentsConnection = async (fetchedClassroom: ClassroomType, args: PaginationArgs): Promise<PageType | Error> =>
	getStudents(fetchedClassroom, args)

export const teachersConnection = async (fetchedClassroom: ClassroomType, args: PaginationArgs): Promise<PageType | Error> =>
	getTeachers(fetchedClassroom, args)
