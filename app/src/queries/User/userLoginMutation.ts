import gql from 'graphql-tag'
import { setCookie, VIEWER_COOKIE_TOKEN } from '../../utils/storage'
import { JWT, Viewer } from '../../types-ts'
import { currentViewerQuery } from '../Viewer/CurrentViewerQuery'

const userLoginMutation = gql`
	mutation LoginViewer($password: String!, $uid: String, $email: String) {
		loginViewer(input: { email: $email, uid: $uid, password: $password }) {
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

export const userLoginMutationConfig = {
	update: (proxy, { data }) => {
		const { loginViewer } = data
		const { viewer, jwt } = loginViewer || {}
		if (viewer && jwt) {
			const { token, expires } = jwt
			const cookieExpiration = expires / 24 / 60 / 60
			if (token)
				setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
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

interface Success {
	jwt: JWT
	viewer: Viewer
}

interface RequiresReset {
	resetToken: string
}

export interface UserLoginMutationResponse {
	resetPassword: Success | RequiresReset
}
