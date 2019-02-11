// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types'
import { withDefaultMutation } from '../Mutation'
import type { MutationWrapper } from '../Mutation'

const mutation = gql`
	mutation UpdateMap($uid: String!, $title: String, $description: String) {
		updateMap(input: { uid: $uid, title: $title, description: $description }) {
			title
			uid
			slug
			description
			classroom {
				uid
				title
				slug
				description
				teachers {
					edges {
						node {
							uid
							name
							roles
						}
					}
				}
			}
			pins {
				pageInfo {
					lastCursor
					hasNextPage
				}
				edges {
					node {
						...PinFragment
					}
				}
			}
			routes {
				pageInfo {
					lastCursor
					hasNextPage
				}
				edges {
					cursor
					node {
						uid
						title
						pins {
							edges {
								node {
									...PinFragment
								}
							}
						}
					}
				}
			}
		}
	}
`

type Response = {
	updateMap: MapType,
}

const UpdateMapMutation: MutationWrapper<Response> = withDefaultMutation(mutation)

export default UpdateMapMutation
