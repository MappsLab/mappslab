import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Pin, NewPinInput } from '../../types-ts'

export const createPinMutation = gql`
	mutation createPin($input: NewPinInput!) {
		createPin(input: $input) {
			uid
			title
			lat
			lng
			owner {
				uid
				name
				roles
			}
			maps {
				pageInfo {
					hasNextPage
					lastCursor
				}
				edges {
					cursor
					node {
						uid
						title
					}
				}
			}
		}
	}
`

interface Response {
	createPin: Pin
}

interface Variables {
	input: NewPinInput
}

export const useCreatePinMutation = () =>
	useMutation<Response, Variables>(createPinMutation)
