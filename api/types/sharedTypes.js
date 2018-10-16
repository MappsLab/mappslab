// @flow

import models from 'Models'
import type { UserType } from 'Types/UserTypes'

export interface DBNode {
	uid: string;
}

type Operator = 'eq' | 'le' | 'lt' | 'ge' | 'gt' | 'uid' | 'allofterms' | 'anyofterms' | 'regexp' | 'alloftext' | 'uid_in' | 'has'

type Where = {
	[key: string]: Filter,
}

export type Filter = {
	operator: Operator,
	value: string,
}

export type PaginationFilterArgs = {
	first?: number,
	after?: string,
	where?: Where,
}

export type PaginationInput = {
	input?: PaginationFilterArgs,
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
