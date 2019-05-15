// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types/Map'
import { withDefaultMutation } from '../Mutation'
import type { MutationWrapper } from '../Mutation'
import { pinFragment } from '../Pin/fragments'

const mutation = gql`
	mutation UpdateMap($uid: String!, $title: String, $description: String, $baseImage: Upload) {
		updateMap(input: { uid: $uid, title: $title, description: $description, baseImage: $baseImage }) {
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
	${pinFragment}
`

type Response = {
	updateMap: MapType,
}

const UpdateMapMutation: MutationWrapper<Response> = withDefaultMutation(mutation)

export default UpdateMapMutation
