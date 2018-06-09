// @flow
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import { typeDefs, resolvers } from '../schema'

const schema = makeExecutableSchema({ typeDefs, resolvers })

type Options = {
	context?: {
		user?: ?Object,
	},
	variables?: ?Object,
}

// Nice little helper function for tests
export const request = (query: mixed, { context, variables }: Options = {}) =>
	graphql(schema, query, undefined, { ...context }, variables)
