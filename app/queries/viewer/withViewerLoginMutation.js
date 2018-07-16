// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'Constants'
import { setCookie } from 'Utils/storage'
import withMutation from '../withMutation'

import { query as currentViewerQuery } from './withCurrentViewerQuery'

const mutation = gql`
	mutation LoginViewer($password: String!, $uid: String, $email: String) {
		loginViewer(credentials: { email: $email, uid: $uid, password: $password }) {
			jwt {
				token
				expires
			}
			viewer {
				uid
				name
				role
			}
		}
	}
`

const config = {
	options: {
		update: (proxy, { data }) => {
			const { loginViewer } = data
			const { viewer, jwt } = loginViewer || {}
			console.log(data)
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
	},
}

const withViewerLoginMutation = withMutation(mutation, config)

export default withViewerLoginMutation
