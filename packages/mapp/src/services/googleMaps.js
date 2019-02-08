// @flow

let scriptLoaded = false

const element = document.createElement('script')

const API_BASE_URL = 'https://maps.googleapis.com/maps/api/js?'

const scriptExists = (): boolean => {
	const scripts = document.querySelectorAll(`[src="${API_BASE_URL}"]`)
	return scripts.length > 0
}

const appendScript = (src: string, onSuccess: () => void, onFailure: (string) => void): void => {
	if (!element.src) {
		element.src = src
		element.async = true
	}

	if (scriptLoaded) {
		onSuccess()
		return
	}

	element.onload = () => {
		scriptLoaded = true
		onSuccess()
	}
	element.onerror = () => {
		scriptLoaded = false
		onFailure('Unable to load Google Maps SDK')
	}
	if (!scriptExists()) {
		document.getElementsByTagName('head')[0].appendChild(element)
	}
}

type Params = {
	[key: string]: string | number,
}

const createSrc = (params: Params): string =>
	[
		API_BASE_URL,
		Object.keys(params)
			.map((key) => `${key}=${params[key]}`)
			.join('&'),
	].join('')

const loadGoogleMaps = (APIKey: string, params: Params = {}): Promise<void | Error> =>
	new Promise(async (resolve, reject) => {
		if (scriptLoaded || scriptExists()) resolve()
		if (!APIKey || APIKey.length === 0) {
			reject(new Error('You must provide an API key'))
			return
		}
		const src = createSrc({ key: APIKey, ...params })
		appendScript(src, resolve, reject)
	})

export default loadGoogleMaps
