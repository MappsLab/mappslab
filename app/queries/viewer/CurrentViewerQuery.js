// @flow
import gql from 'graphql-tag'
import type { UserType } from 'Types/User'
import type { QueryWrapper } from '../Query'
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

type ViewerResponse = {
	currentViewer: UserType,
}

const CurrentViewerQuery: QueryWrapper<ViewerResponse> = withDefaultQuery(query)

export default CurrentViewerQuery
