import { User, JWT } from 'Types'

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

interface RequiresReset {
	resetToken: string
}

export interface LoginResponse {
	loginViewer: LoginSuccess & {
		resetToken: string
	}
}
