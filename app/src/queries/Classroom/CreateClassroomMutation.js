// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation CreateClassroom($input: NewClassroomData!) {
		createClassroom(input: $input) {
			classroom(input: { uid: $uid, slug: $slug }) {
				title
				uid
				slug
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
				maps {
					edges {
						node {
							uid
							name
						}
					}
				}
			}
		}
	}
`

export default withDefaultMutation(mutation)
