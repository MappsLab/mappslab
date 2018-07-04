// @flow
import gql from 'graphql-tag'
import withMutation from '../withMutation'

const mutation = gql`
	mutation createPin($title: String!, $lat: Float!, $lang: Float!, $mapUids: [String]) {
		addPin(input: { title: $title, lat: $lat, lang: $lang, mapUids: $mapUids }) {
			uid
			title
			lat
			lang
			owner {
				uid
				name
			}
			maps {
				pageInfo {
					hasNextPage
					lastCursor
				}
				edges {
					cursor
					node {
						uid
						title
					}
				}
			}
		}
	}
`

// const config = {
// 	options: {
// 		update: (proxy, { data }) => {
// 			const { loginViewer } = data
// 			const { viewer, jwt, requiresReset } = loginViewer
// 			const { token, expires } = jwt
// 			const cookieExpiration = expires / 24 / 60 / 60
// 			if (token) setCookie(VIEWER_COOKIE_TOKEN, token, { expires: cookieExpiration })

// 			// Instead of making another call for the ViewerQuery, write the results of it here
// 			proxy.writeQuery({
// 				query: currentViewerQuery,
// 				data: {
// 					viewer,
// 					requiresReset,
// 				},
// 			})
// 		},
// 	},
// }

const withViewerLoginMutation = withMutation(mutation)

export default withViewerLoginMutation
