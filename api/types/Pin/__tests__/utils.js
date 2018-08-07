import { query } from '../../../database'

export const getFirstPins = async () => {
	const q = `{
		firstPins(func: eq(type, "pin"), first: 10) {
			uid
			title
			owner: ~pinned {
				uid
				name
			}
		}
	}`
	const result = await query(q)
	return result.firstPins
}
