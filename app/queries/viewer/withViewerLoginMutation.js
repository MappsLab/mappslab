// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'App/constants'
import { setCookie } from 'App/utils/storage'
import { makeQuery } from '../utils'

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
			}
		}
	}
`

const config = {
	options: {
		update: (proxy, { data }) => {
			const { loginViewer } = data
			const { viewer, jwt, requiresReset } = loginViewer
			const { token, expires } = jwt
			const cookieExpiration = expires / 24 / 60 / 60
			if (token) setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })

			// Instead of making another call for the ViewerQuery, write the results of it here
			proxy.writeQuery({
				query: currentViewerQuery,
				data: {
					viewer,
					requiresReset,
				},
			})
		},
	},
}

const withViewerLoginMutation = makeQuery(mutation, config)

export default withViewerLoginMutation
