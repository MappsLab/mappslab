import gql from 'graphql-tag'
import { setCookie, VIEWER_COOKIE_TOKEN } from '../../utils/storage'
import { JWT, Viewer } from '../../types-ts'
import { currentViewerQuery } from '../Viewer/CurrentViewerQuery'
import { UserLoginMutationResponse } from './userLoginMutation'

export const resetPasswordMutation = gql`
	mutation ResetPassword($resetToken: String!, $password: String!) {
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

export const resetPasswordMutationConfig = {
	update: (cache, { data }) => {
		const { resetPassword } = data
		const { viewer, jwt } = resetPassword || {}
		if (viewer && jwt) {
			const { token, expires } = jwt
			const cookieExpiration = expires / 24 / 60 / 60
			if (token) {
				setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
			}
			// Instead of making another call for the ViewerQuery, write the results of it here
			cache.writeQuery({
				query: currentViewerQuery,
				data: {
					currentViewer: resetPassword,
				},
			})
		}
	},
}

export type ResetPasswordMutationResponse = UserLoginMutationResponse

