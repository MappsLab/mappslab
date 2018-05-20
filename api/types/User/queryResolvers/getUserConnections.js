// @flow
// @flow

import { getPinsByUser } from '../../Pin/PinModel'
import { getClassroomsByUser } from '../../Classroom/ClassroomModel'

import type { UserType } from '../UserTypes'
import type { PaginationArgs, PageType } from '../../shared/sharedTypes'

export const pins = (loadedUser: UserType, args: PaginationArgs): Promise<PageType | Error> => getPinsByUser(loadedUser, args)

export const classrooms = (loadedUser: UserType, args: PaginationArgs): Promise<PageType | Error> =>
	getClassroomsByUser(loadedUser, args)
