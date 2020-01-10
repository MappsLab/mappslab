// @flow
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import models from 'Models'
import { typeDefs, resolvers } from '../../graphql/schema'
// import { joseph, john, alex } from '../scripts/testDatabase/fixtures/users'

/*
 * Get stubs from Test DB
 */

// export const getUsers = models.User.getUsers()

// export const getViewerForContext = async (userName: string = 'joseph') => {
// 	const users = await getUsers
// 	const fixtureUsers = { joseph, john, alex }
// 	const user = users.find((u) => u.name === fixtureUsers[userName].name)
// 	return user
// }

/**
 *
 */

export const createAdminUsers = async () => {
	const joseph = {
		name: 'Joseph Thomas',
		roles: ['admin', 'teacher'],
		email: 'joseph@good-idea.studio',
		temporaryPassword: 'temporary',
		disabled: false,
	}
	const john = {
		name: 'John Schaefer',
		roles: ['admin', 'teacher'],
		email: 'john@cmwworld.org',
		temporaryPassword: 'temporary',
		disabled: false,
	}
	return Promise.all([
		models.User.createUser(joseph),
		models.User.createUser(john),
	])
}

export const createTestAdminUsers = async () => {
	const joseph = {
		name: 'Joseph Thomas',
		roles: ['admin', 'teacher'],
		email: 'joseph@good-idea.studio',
		password: 'Password#1',
		disabled: false,
	}
	const john = {
		name: 'John Schaefer',
		roles: ['admin', 'teacher'],
		email: 'john@cmwworld.org',
		password: 'Password#1',
		disabled: false,
	}
	return Promise.all([
		models.User.createUser(joseph),
		models.User.createUser(john),
	])
}

/**
 * Request Helper
 */

/* Apollo Server includes this by default, but we aren't using that here so we need to add it manually */
const uploadScalar = `scalar Upload`

const schema = makeExecutableSchema({
	typeDefs: [typeDefs, uploadScalar].join(','),
	resolvers,
})

type Options = {
	context?: {
		user?: ?Object,
	},
	variables?: ?Object,
}

// Nice little helper function for tests
export const request = (
	query: mixed,
	options: Options = {},
): Promise<Object> => {
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
