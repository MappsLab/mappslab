// @flow
import gql from 'graphql-tag'
import { unwindEdges } from 'Utils'
import withQuery from '../withQuery'

export const query = gql`
	query ViewerDashboardQuery {
		currentViewer {
			viewer {
				uid
				name
				role
				classrooms {
					edges {
						node {
							uid
							title
							slug
							maps {
								edges {
									node {
										uid
										title
									}
								}
							}
							teachers {
								edges {
									node {
										uid
										name
										role
									}
								}
							}
						}
					}
				}
			}
		}
	}
`
const config = {
	props: (response) => {
		const { loading, currentViewer, ...rest } = response.data
		const { viewer } = currentViewer || {}
		const combinedViewer = loading ? undefined : unwindEdges(viewer)
		return {
			loading,
			viewer: combinedViewer,
			request: {
				...rest,
			},
		}
	},
}

const withViewerDashboardQuery = withQuery(query, config)

export default withViewerDashboardQuery
