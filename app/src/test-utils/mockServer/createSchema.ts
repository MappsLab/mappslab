// import { makeExecutableSchema } from 'graphql-tools'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'apollo-server'
// import mockTypeDefs from 'Shared/mockUtilsSchema'
import { mocks, typeResolvers } from './mockResolvers'
import typeDefs from '../../../schema.graphql'

type Mock = () => Promise<any>

export type Mocks = {
	[key: string]: Mock
}

export type Context = {
	[key: string]: any
}

const createSchema = (customMocks: Mocks = {}, context: Context = {}) => {
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers: typeResolvers,
	})
	addMockFunctionsToSchema({ schema, mocks: { ...mocks, ...customMocks } })
	return { schema, context }
}

export default createSchema
