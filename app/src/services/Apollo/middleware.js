// @flow
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { getCookie, VIEWER_COOKIE_TOKEN } from 'Utils/storage'

const debug = require('debug')('app:network')

export const setAuthHeader = new ApolloLink((operation, forward) => {
	const authCookie = getCookie(VIEWER_COOKIE_TOKEN)
	if (authCookie) {
		operation.setContext({
			headers: { Authorization: authCookie },
		})
	}
	return forward(operation)
})

export const logQueries = new ApolloLink((operation, forward) => {
	const labelStyle = 'color: deepskyblue; font-weight: 800'
	const messageStyle = 'color: gray'
	if (process.env.NODE_ENV === 'development') {
		const type = operation.query.definitions[0].operation
		debug(`%c[GraphQL Logger] %c(link) Called ${type} ${operation.operationName}`, labelStyle, messageStyle)
		if (operation.variables) debug(' variables ⤑ ', operation.variables)
	}
	return forward(operation).map((result) => {
		if (process.env.NODE_ENV === 'development') {
			debug(`%c[GraphQL Logger]%c (link) received result from ${operation.operationName}:`, labelStyle, messageStyle)
			debug('           ⤑ ', result.data)
		}
		return result
	})
})

export const logErrors = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) => {
			debug(`[GraphQL Error] Message: ${message}, Location: ${locations}, Path: ${path}`)
			debug('           ⤑ ', message)
			debug('           ⤑ ', locations)
			return false
		})
	}
	if (networkError) debug(`[Network Error] ${networkError}`, networkError)
})
