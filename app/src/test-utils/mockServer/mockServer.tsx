import { graphql } from 'graphql'
import { classroomsQuery, teachersQuery, studentsQuery, mapsQuery } from './mockQueries'
import createSchema from './createSchema'

const extractEdges = async (key, query) => {
	const result = await query()
	if (!result.data[key]) throw new Error(`There is no result.data.${key}`)
	return result.data[key].edges.map((e) => e.node)
}

export const createMockServer = (customMocks = {}) => {
	const { schema } = createSchema(customMocks)
	return {
		query: (queryString, { variables, context }) => graphql(schema, queryString, undefined, context, variables),
		getClassrooms: () => extractEdges('classrooms', () => graphql(schema, classroomsQuery)),
		getTeachers: () => extractEdges('teachers', () => graphql(schema, teachersQuery)),
		getStudents: () => extractEdges('students', () => graphql(schema, studentsQuery)),
	}
}

const defaultMockServer = createMockServer()

export default defaultMockServer
