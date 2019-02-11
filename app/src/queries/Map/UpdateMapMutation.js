// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types/Map'
import { withDefaultMutation } from '../Mutation'
import type { MutationWrapper } from '../Mutation'

const mutation = gql`
	mutation UpdateMap($input: UpdateMapInput!) {
		updateMap(input: $input) {
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
