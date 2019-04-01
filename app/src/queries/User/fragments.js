// @flow
import gql from 'graphql-tag'

export const userFragment = gql`
	fragment UserFragment on User {
		uid
		name
		roles
		classrooms {
			edges {
				node {
					uid
					title
					slug
					description
				}
			}
		}
	}
`
