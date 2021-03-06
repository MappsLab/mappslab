import { path } from 'ramda'
import { parseQueryString } from './url'

type NestedObject = any

type SearchConfig = {
	chart: NestedObject
	searchKey: string
	defaults?: NestedObject
}

export const createObjectSearchByState = ({
	chart,
	searchKey,
	defaults,
}: SearchConfig) => (values: NestedObject) => {
	const getByPath = (paths: String) =>
		// @ts-ignore
		path([...paths, searchKey])(chart) as String[]

	const getOptions = (
		value: any,
		previousValues: {} = {},
		parentPath: Array<string> = [],
	) => {
		if (typeof value === 'string') {
			return {
				...previousValues,
				// @ts-ignore
				...getByPath([...parentPath, value]),
			}
		}
		return (
			Object.entries(value)
				.map(([key, val]) => {
					// Get the value for the 'root' of this key
					// @ts-ignore
					const rootVal = getByPath([...parentPath, key])
					// Then, all of its children
					const children = getOptions(val, previousValues, [...parentPath, key])
					// Merge these together
					return {
						...rootVal,
						...children,
					}
				})
				// Merge the results of each key together
				.reduce((acc, current) => ({ ...acc, ...current }), {})
		)
	}

	// Merge all of this on top of any provided defaults
	return {
		...defaults,
		...getOptions(values),
	}
}
