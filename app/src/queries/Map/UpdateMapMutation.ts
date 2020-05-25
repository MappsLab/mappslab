import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Map, MutationUpdateMapArgs } from '../../types-ts'
import { pinFragment } from '../Pin/fragments'
import { mapQuery } from './mapQuery'

export const updateMapMutation = gql`
	mutation UpdateMap(
		$uid: String!
		$title: String
		$description: String
		$baseImage: Upload
		$createDataLayer: DataLayerInput
		$associateDataLayer: UidInput
		$removeDataLayer: UidInput
	) {
		updateMap(
			input: {
				uid: $uid
				title: $title
				description: $description
				baseImage: $baseImage
				createDataLayer: $createDataLayer
				associateDataLayer: $associateDataLayer
				removeDataLayer: $removeDataLayer
			}
		) {
			title
			uid
			slug
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

export type UseUpdateMapVariables = MutationUpdateMapArgs['input']

interface Response {
	updateMap: Map
}

const getOptions = ({ uid }) => ({
	refetchQueries: [{ query: mapQuery, variables: { uid } }],
})

export const useUpdateMapMutation = (mapUid: string) =>
	useMutation<Response, UseUpdateMapVariables>(
		updateMapMutation,
		getOptions({ uid: mapUid }),
	)
