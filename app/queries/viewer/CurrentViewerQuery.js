// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'Constants'
import { removeCookie, setCookie } from 'Utils/storage'
import { withDefaultQuery } from '../Query'

// todo#16 : Make a Viewer fragment and reuse it in the viewer query
export const query = gql`
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

const config = {
	onComplete: (response) => {
		console.log(response)
		const { loading, data } = response
		const { currentViewer } = data
		const { viewer, jwt } = currentViewer || {} // currentViewer may be undefined
		if (!loading) {
			if (viewer && jwt) {
				const { token, expires } = jwt
				const cookieExpiration = expires / 24 / 60 / 60
				if (token) setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
			} else {
				console.log('HERE')
				// removeCookie(VIEWER_COOKIE_TOKEN)
			}
		}
	},
}

const withCurrentViewerQuery = withDefaultQuery(query)

export default withCurrentViewerQuery
