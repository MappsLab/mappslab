// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation CreateClassroom($input: NewClassroomInput!) {
		createClassroom(input: $input) {
			title
			uid
			slug
			__typename
			teachers {
				pageInfo {
					lastCursor
				}
				edges {
					node {
						uid
						name
						roles
					}
				}
			}
			students {
				pageInfo {
					lastCursor
				}
				edges {
					node {
						uid
						name
						roles
					}
				}
			}
		}
	}
`

export default withDefaultMutation(mutation)
