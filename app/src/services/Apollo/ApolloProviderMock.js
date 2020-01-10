// @flow
import * as React from 'react'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import typeDefs from 'Shared/schema.graphql'
import mockTypeDefs from 'Shared/mockUtilsSchema'
import mocks from 'Shared/mockedResolvers'
import typeResolvers from 'Shared/mockedResolvers/typeResolvers'

import { logQueries, logErrors } from './middleware'

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers: typeResolvers,
})

// const mockUtilsSchema = makeExecutableSchema({ typeDefs: mockTypeDefs })

addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true })

const schemaLink = new SchemaLink({ schema })

const link = ApolloLink.from([logErrors, logQueries, schemaLink])

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})

const ApolloWrapper = ({ children }: { children: React.Node }) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
)

export default ApolloWrapper
