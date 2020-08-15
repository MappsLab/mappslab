import gql from 'graphql-tag'
import { pinFragment } from '../pin/fragments'
import { userFragment } from '../user/fragments'
import { imageFragment } from '../shared/fragments'

export const mapFragment = gql`
	fragment MapFragment on Map {
		title
		uid
		slug
		baseImage {
			...ImageFragment
			tileset {
				uid
				baseUri
				maxZoom
			}
		}
		description
		dataLayers {
			pageInfo {
				lastCursor
				hasNextPage
			}
			edges {
				node {
					uid
					title
					uri
				}
			}
		}
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
	${imageFragment}
	${pinFragment}
	${userFragment}
`
