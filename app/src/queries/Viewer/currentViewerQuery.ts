import gql from 'graphql-tag'
import Debug from 'debug'
import { useQuery } from '@apollo/react-hooks'
import { User, Token } from '../../types-ts'
import { getCookie, removeCookie, VIEWER_COOKIE_TOKEN } from 'Utils/storage'

const debug = Debug('app:queries')
// todo#16 : Make a Viewer fragment and reuse it in the viewer query
export const currentViewerQuery = gql`
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

interface Response {
	currentViewer: {
		viewer: User
		jwt: Token
	}
}

export const config = {
	onCompleted: ({ currentViewer }: Response) => {
		if (getCookie(VIEWER_COOKIE_TOKEN) && !currentViewer) {
			debug('User JWT has expired. Clearing cookies..')
			removeCookie(VIEWER_COOKIE_TOKEN)
		}
	},
}

export const useCurrentViewerQuery = () =>
	useQuery<Response>(currentViewerQuery, config)
