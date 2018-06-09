// @flow

import { getClassroom, getClassrooms } from '../ClassroomModel'
import type { ClassroomType } from '../ClassroomTypes'
import type { PageType, GetNodeInput, PaginationInput } from '../../shared/sharedTypes'

export const classroom = (_: Object, { input }: GetNodeInput): Promise<ClassroomType | null | Error> => getClassroom(input)
export const classrooms = (_: Object, { input }: PaginationInput): Promise<PageType | null | Error> => getClassrooms(input)
