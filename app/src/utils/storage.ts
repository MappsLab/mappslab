import Cookies from 'js-cookie'
import { JWT } from '../types-ts'

const debug = require('debug')('app')

export const VIEWER_COOKIE_TOKEN = 'mappslab_user'

interface CookieConfig {
	expires?: number | Date
	path?: string
}

export const setCookie = (key: string, val: any, config?: CookieConfig) => {
	debug(`[deprecated] Setting cookie ${key}`)
	const defaults = {
		expires: 7,
		path: '/',
	}

	const settings = Object.assign(defaults, config)
	const stringified = JSON.stringify(val)
	Cookies.set(key, stringified, settings)
}

export const getCookie = (key: string) => {
	const value = Cookies.get(key)
	if (value) return JSON.parse(value)
	return null
}

export const removeCookie = (key: string) => {
	Cookies.remove(key)
}

export const getViewerCookie = () => getCookie(VIEWER_COOKIE_TOKEN)

export const setViewerCookie = ({ token, expires }: JWT) => {
	debug('Setting cookie')

	const settings = {
		path: '/',
		expires: new Date(expires),
	}
	debug(settings)
	setCookie(VIEWER_COOKIE_TOKEN, token, settings)
}

export const removeViewerCookie = () => removeCookie(VIEWER_COOKIE_TOKEN)
