// @flow
import { merge } from 'lodash'
import { coreTypes, coreTypeResolvers, coreQueryResolvers } from './graphql/core'
import { scalarTypes, scalarResolvers } from './graphql/Scalars'
import { ClassroomSchema, ClassroomQueryResolvers, ClassroomMutationResolvers } from './graphql/Classroom'
import { MapSchema, MapQueryResolvers, MapMutationResolvers } from './graphql/Map'
import { PinSchema, PinQueryResolvers, PinMutationResolvers, PinSubscriptionResolvers } from './graphql/Pin'
import { RouteSchema, RouteQueryResolvers, RouteMutationResolvers } from './graphql/Route'
import { UserSchema, UserQueryResolvers, UserMutationResolvers } from './graphql/User'
import { ImageSchema } from './graphql/Image'

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

export const resolvers = merge(
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
	PinSubscriptionResolvers,
)

export const typeDefs = [
	Root,
	coreTypes,
	scalarTypes,
	ClassroomSchema,
	MapSchema,
	PinSchema,
	RouteSchema,
	UserSchema,
	ImageSchema,
]
