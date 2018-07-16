// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'Constants'
import { removeCookie, setCookie } from 'Utils/storage'
import withQuery from '../withQuery'

// todo#16 : Make a Viewer fragment and reuse it in the viewer query
export const query = gql`
	query ViewerQuery {
		currentVieswer {
			title
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
		const { data } = response
		console.log(response)
		const { loading, currentViewer, ...rest } = data
		const { viewer, jwt } = currentViewer
		if (viewer === null) {
			removeCookie(VIEWER_COOKIE_TOKEN)
		} else {
			const { token, expires } = jwt
			const cookieExpiration = expires / 24 / 60 / 60
			if (token) setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })
			console.log('setting new cookie with expiration', cookieExpiration)
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
