// @flow
import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'

import { coreTypes, coreTypeResolvers, coreQueryResolvers } from './types/core'
import { scalarTypes, scalarResolvers } from './types/Scalars'
import { UserSchema, UserQueryResolvers, UserMutationResolvers } from './types/User'
import { mediaTypes, mediaQueryResolvers } from './types/Media'

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
	mediaQueryResolvers,
	scalarResolvers,
	UserQueryResolvers,
	/**
	 * Mutations
	 */
	UserMutationResolvers,

	/**
	 * Subscriptions
	 */
)

module.exports = {
	typeDefs: [
		Root,
		mediaTypes,
		coreTypes,
		scalarTypes,
		UserSchema
	],
	resolvers,
)
