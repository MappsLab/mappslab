// @flow

import { getUser } from '../UserModel'
import { getPinsByUser } from '../../Pin/PinModel'
import type { GetUserArgs, UserType } from '../UserTypes'
import type { PaginationArgs } from '../../shared/sharedTypes'

export const user = (_: Object, args: GetUserArgs): Promise<UserType | null | Error> => getUser(args)

export const pins = (user: UserType, args: PaginationArgs): Promise<PageType | Error> => getPinsByUser(user, args)
