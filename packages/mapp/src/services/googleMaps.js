// @flow

let scriptLoaded = false

const appendScript = (src: string): Promise<string | Error> =>
	new Promise((resolve, reject) => {
		const element = document.createElement('script')
		element.src = src
		element.async = true
		element.onload = resolve
		element.onerror = reject
		document.getElementsByTagName('head')[0].appendChild(element)
	})

const myCb = () => {
	console.log('ok callback')
}

window.myCb = myCb

const createSrc = (params: Object): string =>
	[
		'https://maps.googleapis.com/maps/api/js?',
		Object.entries(params)
			.map(([key, value]) => `${key}=${value}`)
			.join('&'),
	].join('')

const loadGoogleMaps = (APIKey: string, params: Object = {}): Promise<void | Error> =>
	new Promise(async (resolve, reject) => {
		if (scriptLoaded) {
			console.log('already loaded')
			resolve()
			return
		}
		if (!APIKey || APIKey.length === 0) {
			reject(new Error('You must provide an API key'))
			return
		}
		const src = createSrc({ key: APIKey, callback: 'myCb', ...params })
		console.log('going to load..')
		await appendScript(src).catch((e: Error): void => {
			reject(e)
		})
		console.log('appended')
		scriptLoaded = true
		resolve()
	})

export default loadGoogleMaps
