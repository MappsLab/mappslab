// @flow

type SearchParams = { [key: string]: string }

export const parseQueryString = (search: string): SearchParams =>
	search
		.replace(/^\??/, '')
		.split('&')
		.reduce((acc, term) => {
			const [key, val] = term.split('=')
			return {
				[key]: decodeURI(val),
				...acc,
			}
		}, {})

export const buildQueryString = (params: SearchParams): string =>
	encodeURI(
		Object.entries(params)
			.reduce(
				(acc, [key, val]) => (typeof val === 'string' || typeof val === 'number' ? `${acc}${key}=${val.toString()}&` : acc),
				'?',
			)
			.replace(/&$/, ''),
	)
