// @flow
import React from 'react'
import type { Node } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from 'apollo-utilities'
import config from '../../config'
import fragmentMatcher from './fragmentMatcher'
import { setAuthHeader, logQueries, logErrors } from './middleware'

const debug = require('debug')('app')

debug(`Using API endpoint: ${config.apiRoot}`)

const uploadLink = createUploadLink({ uri: config.apiRoot, credentials: 'same-origin' })

const wsLink = new WebSocketLink({
	uri: config.wsUri,
	options: {
		reconnect: true,
	},
})

const apiLink = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	uploadLink,
)

// @todo Return IDs from more objects for better caching
const cache = new InMemoryCache({
	addTypename: true,
	fragmentMatcher,
	dataIdFromObject: (object) => {
		switch (object.__typename) {
			case 'image':
				return object.publicId
			default:
				return object.uid || null
		}
	},
})

const link = ApolloLink.from([setAuthHeader, logQueries, logErrors, apiLink])

const client = new ApolloClient({ link, cache })

const ApolloWrapper = (props: { children: Node }) => <ApolloProvider client={client}>{props.children}</ApolloProvider>

export default ApolloWrapper
