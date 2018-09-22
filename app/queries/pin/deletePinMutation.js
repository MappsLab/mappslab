// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'
import { query as mapQuery } from '../map/withMapQuery'

const mutation = gql`
	mutation deletePin($uid: String!) {
		deletePin(input: { uid: $uid }) {
			success
		}
	}
`

const config = {
	name: 'createPin',
	options: (props) => ({
		refetchQueries: [
			{
				query: mapQuery,
				variables: {
					uid: props.mapUid,
				},
			},
		],
	}),
	// props: (response) => {
	// 	const { data, loading, networkStatus, ...rest } = response
	// 	const pin = response.addPin ? unwindEdges(response.addPin) : null
	// 	return {
	// 		loading,
	// 		networkStatus,
	// 		pin,
	// 		request: {
	// 			...rest,
	// 		},
	// 	}
	// },
}

export default withDefaultMutation(mutation, config)
