// @flow

let scriptLoaded = false

const element = document.createElement('script')

const API_BASE_URL = 'https://maps.googleapis.com/maps/api/js?'

const scriptExists = (): boolean => {
	const scripts = document.querySelectorAll(`[src="${API_BASE_URL}"]`)
	return scripts.length > 0
}

const appendScript = (src: string, onSuccess: () => void, onFailure: () => void): void => {
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
		onFailure()
	}
	if (!scriptExists()) {
		document.getElementsByTagName('head')[0].appendChild(element)
	}
}

const createSrc = (params: Object): string =>
	[
		API_BASE_URL,
		Object.entries(params)
			// $FlowFixMe - how to type an object whose values can only be strings?
			.map(([key, value]) => `${key}=${value}`)
			.join('&'),
	].join('')

const loadGoogleMaps = (APIKey: string, params: Object = {}): Promise<void | Error> =>
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
