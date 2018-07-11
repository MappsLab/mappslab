// @flow
import gql from 'graphql-tag'
import withSubscription from '../withSubscription'
import { unwindEdges } from '../utils'

export const query = gql`
	subscription pinAddedToMap($mapUid: String!) {
		pinAddedToMap(input: { mapUid: $mapUid }) {
			uid
			title
			lat
			lang
			owner {
				uid
				name
			}
		}
	}
`

const config = {
	options: (props) => ({
		variables: { mapUid: props.uid },
	}),
	props: (response) => {
		const { loading, pinAddedToMap, ...rest } = response

		return {
			loading,
			pinAddedToMap: pinAddedToMap ? unwindEdges(pinAddedToMap) : null,
			request: {
				...rest,
			},
		}
	},
}

export const withPinAddedToMapSubscription = withSubscription(query, config)
