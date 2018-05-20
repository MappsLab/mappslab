// @flow

// Taken from https://github.com/withspectrum/spectrum
// import Raven from 'shared/raven';
import type { GraphQLError } from 'graphql'
import { IsUserError } from '../errorTypes'

const debug = require('debug')('api:utils:error-formatter')

const createGraphQLErrorFormatter = (error: GraphQLError) => {
	console.log(error)
	debug('---GraphQL Error---')
	debug(error)
	debug('-------------------\n')
	const isUserError = error.originalError ? error.originalError[IsUserError] === true : error[IsUserError] === true
	const sentryId =
		!isUserError && process.env.NODE_ENV === 'production'
			? // ? sentryId = Raven.captureException(error, req && Raven.parsers.parseRequest(req))
			  'Error placeholder..'
			: 'ID only generated in production'
	return {
		message: isUserError ? error.message : `Internal server error: ${sentryId}`,
		// Hide the stack trace in production mode
		stack: !process.env.NODE_ENV === 'production' ? error.stack.split('\n') : null,
	}
}

export default createGraphQLErrorFormatter
