// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'Constants'
import { setCookie } from 'Utils/storage'
import { withDefaultMutation } from '../Mutation'

import { query as currentViewerQuery } from '../viewer/withCurrentViewerQuery'

const mutation = gql`
	mutation LoginViewer($password: String!, $uid: String, $email: String) {
		loginViewer(credentials: { email: $email, uid: $uid, password: $password }) {
			... on LoginSuccess {
				jwt {
					token
					expires
				}
				viewer {
					uid
					name
					roles
				}
			}
			... on RequiresReset {
				resetToken
			}
		}
	}
`

const config = {
	update: (proxy, { data }) => {
		const { loginViewer } = data
		const { viewer, jwt } = loginViewer || {}
		if (viewer && jwt) {
			const { token, expires } = jwt
			const cookieExpiration = expires / 24 / 60 / 60
			if (token) setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
			// Instead of making another call for the ViewerQuery, write the results of it here
			proxy.writeQuery({
				query: currentViewerQuery,
				data: {
					currentViewer: loginViewer,
				},
			})
		}
	},
}

const UserLoginMutation = withDefaultMutation(mutation, config)

export default UserLoginMutation
