// @flow
import gql from 'graphql-tag'
import { makeQuery, unwindEdges } from '../utils'

// todo#16 : Make a Viewer fragment and reuse it in the viewer query
export const query = gql`
	query ViewerDashboardQuery {
		viewer {
			uid
			name
			role
			classrooms {
				edges {
					node {
						uid
					}
				}
			}
		}
	}
`
const config = {
	props: ({ ownProps, data }) => {
		const { loading, viewer, ...rest } = unwindEdges(data)

		const combinedViewer = {
			...ownProps.viewer,
			...viewer,
		}
		return {
			loading,
			viewer: combinedViewer,
			request: {
				...rest,
			},
		}
	},
}

const withViewerDashboardQuery = makeQuery(query, config)

export default withViewerDashboardQuery
