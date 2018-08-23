import { query } from 'Database'

export const getFirstMaps = async (num = 3) => {
	const q = `{
		firstMaps(func: eq(type, "map"), first: ${num}) {
			uid
			title
		}
	}`
	const result = await query(q)
	return result.firstMaps
}
