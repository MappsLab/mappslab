import { query } from '../../../database'

export const getFirstPin = async () => {
	const q = `{
		firstPin(func: eq(type, "pin"), first: 1) {
			uid
			title
		}
	}`
	const result = await query(q)
	return result.firstPin[0]
}
