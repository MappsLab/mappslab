// @flow
import * as React from 'react'
import ApolloClient from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
// import mockTypeDefs from 'Shared/mockUtilsSchema'
import createSchema from './createSchema'
import type { Mocks, Context } from './createSchema'

export const createMockProvider = (customMocks: Mocks = {}, customContext: Context = {}) => {
	const { schema, context } = createSchema(customMocks, customContext)
	const schemaLink = new SchemaLink({ schema, context })

	const client = new ApolloClient({
		link: schemaLink,
		cache: new InMemoryCache(),
	})

	const ApolloWrapper = ({ children }: { children: React.Node }) => <ApolloProvider client={client}>{children}</ApolloProvider>
	return ApolloWrapper
}

const DefaultProvider = createMockProvider()

export default DefaultProvider
