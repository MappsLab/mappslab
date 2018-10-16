// @flow
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import models from 'Models'
import { typeDefs, resolvers } from '../../schema'
// import { joseph, john, waverly } from '../scripts/testDatabase/fixtures/users'

/*
 * Get stubs from Test DB
 */

// export const getUsers = models.User.getUsers()

// export const getViewerForContext = async (userName: string = 'joseph') => {
// 	const users = await getUsers
// 	const fixtureUsers = { joseph, john, waverly }
// 	const user = users.find((u) => u.name === fixtureUsers[userName].name)
// 	return user
// }

/**
 *
 */

export const createAdminUser = async () => {
	const joseph = {
		name: 'Joseph Thomas',
		roles: ['admin'],
		email: 'joseph@good-idea.studio',
		password: 'Password#1',
		disabled: false,
	}
	return models.User.createUser(joseph)
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
export const request = (query: mixed, options: Options = {}): Promise<Object> => {
	const { context, variables } = options
	Object.keys(options).forEach((key) => {
		if (key !== 'context' && key !== 'variables') {
			// eslint-disable-next-line no-console
			console.warn(
				`[Request helper]: "${key}" is not a valid option and will be discarded. Did you mean to use include this within 'context' or 'variables'?`,
			)
		}
	})
	// $FlowFixMe
	return graphql(
		schema,
		query,
		undefined,
		{
			...context,
			models,
		},
		variables,
	)
}
