// @flow

import { getViewer, getUser } from '../UserModel'
import { getPinsByUser } from '../../Pin/PinModel'
import type { GetUserArgs, UserType } from '../UserTypes'
import type { PaginationArgs, GraphQLContext, PageType } from '../../shared/sharedTypes'

export const user = (_: Object, args: GetUserArgs): Promise<UserType | null | Error> => getUser(args)

export const currentViewer = async (_: Object, args: null, request: GraphQLContext): Promise<UserType | null | Error> => {
	if (!request.viewer || !request.viewer.uid) return null
	const { uid } = request.viewer
	return getViewer({ uid })
}
