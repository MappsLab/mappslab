// @flow
import type { Client } from 'react-apollo'
import { VIEWER_COOKIE_TOKEN } from '../constants'
import { removeCookie } from './storage'

export const logoutViewer = (client: Client) => {
	removeCookie(VIEWER_COOKIE_TOKEN)
	client.resetStore()
}
