// @flow
import type { UserType, UpdateUserData } from 'Types/UserTypes'
import { createEdge, removeEdge, mutateNode } from 'Database'
import { getUser } from './readUser'
import { clean, validateUpdate } from './userDBSchema'

export const updateUser = async (args: UpdateUserData): Promise<UserType> => {
	const { uid, addToClassrooms, removeFromClassrooms, ...userData } = args
	const fetchedUser = await getUser({ uid })
	if (!fetchedUser) throw new Error(`A user with uid "${uid}" does not exist`)
	// $FlowFixMe
	const cleaned = await clean<UpdateUserData>(userData)
	const validated = await validateUpdate(cleaned)
	const pred =
		fetchedUser.roles && fetchedUser.roles.includes('teacher')
			? 'teaches_in'
			: fetchedUser.roles && fetchedUser.roles.includes('student')
			? 'learns_in'
			: null

	const edgesToCreate = addToClassrooms && pred ? addToClassrooms.map((toUid) => [{ fromUid: uid, pred, toUid }, {}]) : []
	const edgesToRemove =
		removeFromClassrooms && pred ? removeFromClassrooms.map((toUid) => [{ fromUid: uid, pred, toUid }, {}]) : []
	await mutateNode(uid, validated)
	if (edgesToCreate.length) await Promise.all(edgesToCreate.map(([edge, config]) => createEdge(edge, config)))
	if (edgesToRemove.length) await Promise.all(edgesToRemove.map(([edge, config]) => removeEdge(edge, config)))
	return {
		...fetchedUser,
		...validated,
	}
}
