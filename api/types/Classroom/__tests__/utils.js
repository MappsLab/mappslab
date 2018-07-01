import { query } from '../../../database'

export const getFirstClassrooms = async (num = 3) => {
	const q = `{
		firstClassrooms(func: eq(type, "classroom"), first: ${num}) {
			uid
			title
		}
	}`
	const result = await query(q)
	return result.firstClassrooms
}
