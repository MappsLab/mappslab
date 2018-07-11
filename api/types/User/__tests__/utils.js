import { query } from '../../../database'

export const getFirstUsers = async () => {
	const q = `{
		firstUsers(func: eq(type, "user"), first: 3) {
			uid
			name
			email
			role
		}
	}`
	const result = await query(q)
	return result.firstUsers
}
