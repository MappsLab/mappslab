import gql from 'graphql-tag'
import { MutationFunctionOptions } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import { setCookie, VIEWER_COOKIE_TOKEN } from '../../utils/storage'
import { Token, Viewer, MutationLoginViewerArgs } from '../../types-ts'
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

type Variables = MutationLoginViewerArgs['input']

interface Success {
	jwt: Token
	viewer: Viewer
}

interface RequiresReset {
	resetToken: string
}

interface Response {
	loginViewer: Success | RequiresReset
}

export const userLoginMutationConfig: MutationFunctionOptions<
	Response,
	Variables
> = {
	update: (proxy, { data }) => {
		if (!data) throw new Error('Did not receive data')
		const { loginViewer } = data
		if ('resetToken' in loginViewer) {
			return
		}
		const { viewer, jwt } = loginViewer || {}
		if (viewer && jwt) {
			const { token, expires } = jwt
			const cookieExpiration = parseInt(expires, 10) / 24 / 60 / 60
			console.log(
				'Expires: Make sure this is correct!',
				parseInt(expires, 10),
				{ expires, cookieExpiration },
			)
			if (token) {
				setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
			}
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

export const useUserLoginMutation = () =>
	useMutation<Response, Variables>(userLoginMutation)