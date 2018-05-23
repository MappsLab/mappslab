// @flow
import React from 'react'
import type { Node } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { getCookie } from '../utils/storage'
import { VIEWER_COOKIE_TOKEN } from '../constants'
import config from '../config'

const debug = require('debug')('app')

debug(`Using API endpoint: ${config.apiRoot}`)

const uploadLink = createUploadLink({ uri: config.apiRoot, credentials: 'same-origin' })

// TODO Return IDs from more objects for better caching
const cache = new InMemoryCache({
	addTypename: true,
	dataIdFromObject: (object) => {
		switch (object.__typename) {
			case 'image':
				return object.publicId
			default:
				return object.uid || null
		}
	},
})

const setAuthHeader = new ApolloLink((operation, forward) => {
	const authCookie = getCookie(VIEWER_COOKIE_TOKEN)
	if (authCookie) {
		operation.setContext({
			headers: { Authorization: authCookie },
		})
	}
	return forward(operation)
})

const logQueries = new ApolloLink((operation, forward) => {
	const labelStyle = 'color: deepskyblue; font-weight: 800'
	const messageStyle = 'color: gray'
	if (process.env.NODE_ENV === 'development') {
		debug(`%c[GraphQL Logger] %c(link) Called ${operation.operationName}`, labelStyle, messageStyle)
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

const logErrors = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) => {
			debug(`[GraphQL Error] Message: ${message}, Location: ${locations}, Path: ${path}`)
			debug('           ⤑ ', message)
			debug('           ⤑ ', locations)
			return false
		})
	}
	if (networkError) debug(`[Network Error] ${networkError}`, networkError.response, networkError.response.body)
})

const link = ApolloLink.from([setAuthHeader, logQueries, logErrors, uploadLink])

const client = new ApolloClient({ link, cache })

const ApolloWrapper = (props: { children: Node }) => <ApolloProvider client={client}>{props.children}</ApolloProvider>

export default ApolloWrapper
