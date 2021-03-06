import * as React from 'react'
import Debug from 'debug'
import {
	ApolloLink,
	split,
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from 'apollo-utilities'
import { config } from '../../config'
import { setAuthHeader, logQueries, logErrors } from './middleware'

const debug = Debug('app')

debug(`Using API endpoint: ${config.apiRoot}`)

const uploadLink = createUploadLink({
	uri: config.apiRoot,
	credentials: 'same-origin',
})

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
	// This error is just outdated typings in the @types/apollo-upload-client
	// package. See https://github.com/jaydenseric/apollo-upload-client/issues/213
	// @ts-ignore
	uploadLink,
)

interface CacheObject {
	__typename: string
	publicId: string
	uid: string
}

const cache = new InMemoryCache()

const link = ApolloLink.from([setAuthHeader, logQueries, logErrors, apiLink])

const client = new ApolloClient({ link, cache })

interface Props {
	children: React.ReactNode
}

export const ApolloWrapper = ({ children }: Props) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
)
