// @flow
import gql from 'graphql-tag'
import type { UserType } from 'Types/User'
import { getCookie, removeCookie, VIEWER_COOKIE_TOKEN } from 'Utils/storage'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

const debug = require('debug')('app')
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

type ViewerResponse = {
	currentViewer: UserType,
}

const config = {
	onCompleted: ({ currentViewer }: ViewerResponse) => {
		if (getCookie(VIEWER_COOKIE_TOKEN) && !currentViewer) {
			debug('User JWT has expired. Clearing cookies..')
			removeCookie(VIEWER_COOKIE_TOKEN)
		}
	},
}

const CurrentViewerQuery: QueryWrapper<ViewerResponse> = withDefaultQuery(query, config)

export default CurrentViewerQuery
