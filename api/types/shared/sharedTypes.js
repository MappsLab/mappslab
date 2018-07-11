// @flow

import type { UserType } from '../User/UserTypes'
import User from '../User/UserModel'
import Pin from '../Pin/PinModel'
import Classroom from '../Classroom/ClassroomModel'
import Map from '../Map/MapModel'

const Models = {
	User,
	Pin,
	Classroom,
	Map,
}

type Operator = 'eq' | 'le' | 'lt' | 'ge' | 'gt' | 'uid' | 'allofterms' | 'anyofterms' | 'regexp' | 'alloftext' | 'uid_in' | 'has'

export type Filter = {
	key: string,
	value: string,
	operator?: Operator,
}

export type PaginationArgs = {
	first: number,
	after: string,
}

export type PaginationInput = {
	input?: PaginationArgs,
}

export type GetNodeArgs =
	| {
			uid: string,
	  }
	| {
			slug: string,
	  }

export type GetNodeInput = {
	input: GetNodeArgs,
}

export type GraphQLContext = {
	viewer: UserType,
	models: typeof Models,
	session: Object,
}

export type Edge = {
	cursor: string,
	node: Object,
}

export type PageInfo = {
	hasNextPage: boolean,
	lastCursor: null | string,
}

export type PageType = {
	pageInfo: PageInfo,
	edges: Array<?Edge>,
}
