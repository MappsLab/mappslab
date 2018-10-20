// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'Constants'
import { setCookie } from 'Utils/storage'
import { withDefaultMutation } from '../Mutation'
import { query as currentViewerQuery } from '../Viewer/CurrentViewerQuery'

const mutation = gql`
	mutation LoginViewer($resetToken: String!, $password: String!) {
		resetPassword(input: { resetToken: $resetToken, password: $password }) {
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
		const { resetPassword } = data
		const { viewer, jwt } = resetPassword || {}
		if (viewer && jwt) {
			const { token, expires } = jwt
			const cookieExpiration = expires / 24 / 60 / 60
			if (token) setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
			// Instead of making another call for the ViewerQuery, write the results of it here
			proxy.writeQuery({
				query: currentViewerQuery,
				data: {
					currentViewer: resetPassword,
				},
			})
		}
	},
}

const ResetPasswordMutation = withDefaultMutation(mutation, config)

export default ResetPasswordMutation
