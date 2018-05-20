// @flow
import gql from 'graphql-tag'
import * as R from 'ramda'
import { makeQuery, unwindEdges } from '../utils'

export const query = gql/* GraphQL */ `
	{
		classrooms {
			edges {
				node {
					uid
					title
					teachers {
						edges {
							node {
								name
							}
						}
					}
				}
			}
		}
	}
`

const config = {
	props: ({ data }) => {
		const { loading, user, ...rest } = data
		const classrooms = unwindEdges('classrooms', data)
		return {
			loading,
			classrooms,
			request: {
				...rest,
			},
		}
	},
}

const withClassroomsQuery = makeQuery(query, config)

export default withClassroomsQuery
