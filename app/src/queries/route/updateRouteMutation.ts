import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Route, MutationUpdateRouteArgs } from '../../types-ts'
import { mapQuery } from '../map/mapQuery'

export const updateRouteMutation = gql`
	mutation UpdateRoute(
		$uid: String!
		$title: String
		$description: String
		$image: Upload
		$video: String
	) {
		updateRoute(
			input: {
				uid: $uid
				description: $description
				title: $title
				image: $image
				video: $video
			}
		) {
			uid
			title
			description
			image {
				uid
				original {
					uri
					width
					height
					format
				}
				sizes {
					uri
					width
					height
					format
				}
			}
		}
	}
`

export interface UpdateRouteMutation {
	updateRoute: Route
}

interface Config {
	mapUid: string
}

const getOptions = ({ mapUid }: Config) => ({
	refetchQueries: [{ query: mapQuery, variables: { uid: mapUid } }],
})

export type UpdateRouteVariables = MutationUpdateRouteArgs['input']

export const useUpdateRouteMutation = (config: Config) =>
	useMutation<UpdateRouteMutation, UpdateRouteVariables>(
		updateRouteMutation,
		getOptions(config),
	)
