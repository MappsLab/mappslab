// @flow
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs, resolvers } from '../schema'
import { joseph, john, waverly } from './scripts/testDatabase/fixtures/users'

import Pin from '../types/Pin/PinModel'
import User from '../types/User/UserModel'

const models = {
	Pin,
	User,
}

/**
 * Get stubs from Test DB
 */

export const getUsers = User.getUsers()

/**
 * Request Helper
 */

const schema = makeExecutableSchema({ typeDefs, resolvers })

type Options = {
	context?: {
		user?: ?Object,
	},
	variables?: ?Object,
}

// Nice little helper function for tests
export const request = (query: mixed, { context, variables }: Options = {}): Promise<Object | Error> =>
	graphql(schema, query, undefined, { ...context, models }, variables)
