// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'

export const query = gql`
	query ViewerDashboardQuery {
		currentViewer {
			viewer {
				uid
				name
				roles
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
										roles
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

const withViewerDashboardQuery = withDefaultQuery(query)

export default withViewerDashboardQuery
