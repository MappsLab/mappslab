// @flow
import gql from 'graphql-tag'
import { VIEWER_COOKIE_TOKEN } from 'App/constants'
import { removeCookie } from 'App/utils/storage'
import withQuery from '../withQuery'

// todo#16 : Make a Viewer fragment and reuse it in the viewer query
export const query = gql`
	query ViewerQuery {
		viewer {
			uid
			name
			role
		}
	}
`
const config = {
	props: ({ data }) => {
		const { loading, viewer, ...rest } = data
		if (viewer === null) {
			removeCookie(VIEWER_COOKIE_TOKEN)
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
