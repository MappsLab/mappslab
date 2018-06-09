// @flow
import { merge } from 'lodash'
import { coreTypes, coreTypeResolvers, coreQueryResolvers } from './types/core'
import { scalarTypes, scalarResolvers } from './types/Scalars'
import { ClassroomSchema, ClassroomQueryResolvers, ClassroomMutationResolvers } from './types/Classroom'
import { MapSchema, MapQueryResolvers, MapMutationResolvers } from './types/Map'
import { PinSchema, PinQueryResolvers, PinMutationResolvers } from './types/Pin'
import { RouteSchema, RouteQueryResolvers, RouteMutationResolvers } from './types/Route'
import { UserSchema, UserQueryResolvers, UserMutationResolvers } from './types/User'

const Root = /* GraphQL */ `
	type Query {
		dummy: String
	}

	type Mutation {
		dummy: String
	}

	type Subscription {
		dummy: String
	}

	schema {
		query: Query
		mutation: Mutation
		subscription: Subscription
	}
`

const resolvers = merge(
	{},
	/**
	 * Queries
	 */
	coreQueryResolvers,
	coreTypeResolvers,
	scalarResolvers,
	ClassroomQueryResolvers,
	MapQueryResolvers,
	PinQueryResolvers,
	RouteQueryResolvers,
	UserQueryResolvers,
	/**
	 * Mutations
	 */
	ClassroomMutationResolvers,
	MapMutationResolvers,
	PinMutationResolvers,
	RouteMutationResolvers,
	UserMutationResolvers,

	/**
	 * Subscriptions
	 */
)

module.exports = {
	typeDefs: [Root, coreTypes, scalarTypes, ClassroomSchema, MapSchema, PinSchema, RouteSchema, UserSchema],
	resolvers,
}
