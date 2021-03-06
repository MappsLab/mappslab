import * as React from 'react'
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import createSchema, { Mocks, Context } from './createSchema'

export const createMockProvider = (
	customMocks: Mocks = {},
	customContext: Context = {},
) => {
	const { schema, context } = createSchema(customMocks, customContext)
	const schemaLink = new SchemaLink({ schema, context })

	const client = new ApolloClient({
		link: schemaLink,
		cache: new InMemoryCache(),
	})

	const ApolloWrapper = ({ children }: { children: React.ReactNode }) => (
		<ApolloProvider client={client}>{children}</ApolloProvider>
	)
	return ApolloWrapper
}

const DefaultProvider = createMockProvider()

export default DefaultProvider
