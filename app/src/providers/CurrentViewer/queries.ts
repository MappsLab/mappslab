import { User, JWT } from 'Types'

/**
 * Current Viewer
 */
export const CURRENT_VIEWER_QUERY = /* GraphQL */ `
	query ViewerQuery {
		currentViewer {
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
	}
`

interface LoginSuccess {
	jwt: JWT
	viewer: User
}

export interface CurrentViewerResponse {
	currentViewer: LoginSuccess
}

/**
 * Login
 */

export const LOGIN_MUTATION = /* GraphQL */ `
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

export interface LoginResponse {
	loginViewer: LoginSuccess & {
		resetToken: string
	}
}

/**
 * Reset
 */

export const RESET_MUTATION = /* GraphQL */ `
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

export interface ResetResponse {
	resetPassword: LoginSuccess & {
		resetToken: string
	}
}
