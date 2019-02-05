import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import typeDefs from '../../../../schema.graphql'
import { mocks, typeResolvers } from './mockResolvers'
import { classroomsQuery, teachersQuery, studentsQuery, mapsQuery } from './mockQueries'

const schema = makeExecutableSchema({ typeDefs, resolvers: typeResolvers })

// console.log(schema)
addMockFunctionsToSchema({ schema, mocks })

const extractEdges = async (key, query) => {
	const result = await query()
	if (!result.data[key]) throw new Error(`There is no result.data.${key}`)
	return result.data[key].edges.map((e) => e.node)
}

const mockServer = {
	query: (q) => graphql(schema, q),
	getClassrooms: () => extractEdges('classrooms', () => graphql(schema, classroomsQuery)),
	getTeachers: () => extractEdges('teachers', () => graphql(schema, teachersQuery)),
	getStudents: () => extractEdges('students', () => graphql(schema, studentsQuery)),
	// getMaps: () => extractEdges('maps', () => graphql(schema, mapsQuery)),
}

export default mockServer
