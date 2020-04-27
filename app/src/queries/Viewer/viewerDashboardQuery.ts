// @flow
import gql from 'graphql-tag'
import { Viewer } from '../../types-ts'

export const viewerDashboardQuery = gql`
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

export interface ViewerDashboardQueryResponse {
	viewer: Viewer
}
