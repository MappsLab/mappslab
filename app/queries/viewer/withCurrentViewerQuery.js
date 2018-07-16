// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'Constants'
import { removeCookie, setCookie } from 'Utils/storage'
import withQuery from '../withQuery'

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
				role
			}
		}
	}
`
const config = {
	props: (response) => {
		const { loading, data, ...rest } = response
		const { currentViewer } = data
		const { viewer, jwt } = currentViewer || {} // currentViewer may be undefined
		if (!loading) {
			if (viewer && jwt) {
				const { token, expires } = jwt
				const cookieExpiration = expires / 24 / 60 / 60
				if (token) setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
			} else {
				removeCookie(VIEWER_COOKIE_TOKEN)
			}
		}
		return {
			loading,
			viewer,
			request: {
				...rest,
			},
		}
	},
}

const withCurrentViewerQuery = withQuery(query, config)

export default withCurrentViewerQuery
