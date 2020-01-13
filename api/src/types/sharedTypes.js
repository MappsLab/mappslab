// @flow

import models from 'Models'
import type { UserType } from 'Types/UserTypes'

export interface DBNode {
	uid: string;
}

type Operator =
	| 'contains'
	| 'has'
	| 'eq'
	| 'notEq'
	| 'lt'
	| 'lte'
	| 'gt'
	| 'gte'
	| 'between'

export type Filter = {
	[key: Operator]: string | Date | number | boolean,
}

type Where = {
	[key: string]: Filter,
}

export type PaginationFilterArgs = {
	first?: number,
	after?: string,
	where?: Where,
}

export type PaginationInput = {
	input?: PaginationFilterArgs,
}

export type GetNodeArgs = {
	uid: string,
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
