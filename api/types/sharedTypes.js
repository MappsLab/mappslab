// @flow

import models from 'Models'
import type { UserType } from 'Types/UserTypes'

export interface DBNode {
	uid: string;
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
	filter: any,
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
	models: typeof models,
	session: Object,
}

export type Edge<T> = {
	cursor: string,
	node: T,
}

export type PageInfo = {
	hasNextPage: boolean,
	lastCursor: null | string,
}

export type PageType<T> = {
	pageInfo: PageInfo,
	edges: Array<?Edge<T>>,
}

export type Success = {
	success: boolean,
	messages: Array<string>,
}
