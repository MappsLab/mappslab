// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types/Map'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'
import { pinFragment } from '../Pin/fragments'
import { userFragment } from '../User/fragments'
import { imageFragment } from '../shared/fragments'

export const query = gql/* GraphQL */ `
	query MapQuery($uid: String!) {
		map(input: { uid: $uid }) {
			title
			uid
			slug
			baseImage {
				...ImageFragment
			}
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
						__typename
						uid
						title
						description
						video
						image {
							...ImageFragment
						}
						owner {
							...UserFragment
						}
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
	${imageFragment}
	${pinFragment}
	${userFragment}
`

export type MapResponse = {
	map: MapType,
}

const MapQuery: QueryWrapper<MapResponse> = withDefaultQuery(query)

export default MapQuery
