// @flow
import gql from 'graphql-tag'
import * as R from 'ramda'
import makeQuery from '../makeQuery'

export const query = gql`
	{
		user(username: $username, uid: $userId) {
			uid
			username
			isFollowedByViewer
		}
	}
`

const config = {
	options: ({ user: { uid, username } }) => {
		if (uid) {
			return { variables: { userId: uid } }
		}
		return {
			variables: {
				username: username ? username.replace(/^@/, '') : null,
			},
		}
	},
	// props: ({ data }) => {
	// 	const { loading, user, ...rest } = data
	// 	console.log(data)
	// 	return {
	// 		loading,
	// 		loadedUser: user,
	// 		request: {
	// 			...rest,
	// 		},
	// 	}
	// },
}

const withFollowButtonQuery = makeQuery(query, config)

export default withFollowButtonQuery
