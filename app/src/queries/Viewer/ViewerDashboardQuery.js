// @flow
import gql from 'graphql-tag'
import type { ViewerType } from 'Types/User'
import type { QueryWrapper } from '../Query'
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
										classroom {
											uid
											title
											slug
										}
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

type ViewerResponse = {
	viewer: ViewerType,
}

const ViewerClassroomsQuery: QueryWrapper<ViewerResponse> = withDefaultQuery(query)

export default ViewerClassroomsQuery
