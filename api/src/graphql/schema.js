// @flow
import { merge } from 'lodash'
import { coreTypes, coreTypeResolvers, coreQueryResolvers } from './core'
import { scalarTypes, scalarResolvers } from './Scalars'
import {
	ClassroomSchema,
	ClassroomQueryResolvers,
	ClassroomMutationResolvers,
} from './Classroom'
import {
	MapSchema,
	MapQueryResolvers,
	MapMutationResolvers,
	MapSubscriptionResolvers,
} from './Map'
import {
	PinSchema,
	PinQueryResolvers,
	PinMutationResolvers,
	PinSubscriptionResolvers,
} from './Pin'
import {
	RouteSchema,
	RouteQueryResolvers,
	RouteMutationResolvers,
} from './Route'
import { UserSchema, UserQueryResolvers, UserMutationResolvers } from './User'
import { ImageSchema, ImageResolvers } from './Image'
import { TilesetSchema } from './Tileset'
import { DataLayerSchema, DataLayerQueryResolvers } from './DataLayer'

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
	ImageResolvers,
	DataLayerQueryResolvers,
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
	MapSubscriptionResolvers,
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
	TilesetSchema,
	DataLayerSchema,
]
