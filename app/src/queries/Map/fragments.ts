import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'
import { pinFragment } from '../Pin/fragments'
import { userFragment } from '../User/fragments'
import { imageFragment } from '../shared/fragments'

export const mapFragment = gql/* GraphQL */ `
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
					url
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
