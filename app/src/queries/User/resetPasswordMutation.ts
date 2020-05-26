import gql from 'graphql-tag'
import { MutationFunctionOptions, useMutation } from '@apollo/client'
import { setCookie, VIEWER_COOKIE_TOKEN } from '../../utils/storage'
import { Token, Viewer, MutationResetPasswordArgs } from '../../types-ts'
import { currentViewerQuery } from '../viewer/currentViewerQuery'

interface Response {
	resetPassword: { jwt: Token; viewer: Viewer }
}

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

const config: MutationFunctionOptions<Response, Variables> = {
	update: (cache, { data }) => {
		if (!data) throw new Error('Did not recieve data')
		const { resetPassword } = data
		const { viewer, jwt } = resetPassword || {}
		if (viewer && jwt) {
			const { token, expires } = jwt
			const cookieExpiration = parseInt(expires, 10) / 24 / 60 / 60
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

type Variables = MutationResetPasswordArgs['input']

export const useResetPasswordMutation = () =>
	useMutation<Response, Variables>(resetPasswordMutation, config)
