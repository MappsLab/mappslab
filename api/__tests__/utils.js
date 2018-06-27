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

export const getViewerForContext = async (userName: string = 'joseph') => {
	const users = await getUsers
	const fixtureUsers = { joseph, john, waverly }
	const user = users.find((u) => u.name === fixtureUsers[userName].name)
	return user
}
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
