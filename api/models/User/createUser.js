// @flow
import type { NewUserData, UserType } from 'Types/UserTypes'
import { ValidationError } from 'Errors'
import { createNodeWithEdges } from 'Database'
import { clean, defaultValues, validateNew } from './userDBSchema'
import { getUser } from './readUser'

const debug = require('debug')('api:user')

type NewUserDataWithRoles = NewUserData & {
	roles?: Array<string>,
}

export const createUser = async (args: NewUserDataWithRoles): Promise<UserType> => {
	const { addToClassrooms, ...userData } = args
	const cleaned = await clean({ ...defaultValues, ...userData, createdAt: new Date() })
	const validatedUserData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	// $FlowFixMe TODO
	const edges = []
	const pred =
		args.roles && args.roles.includes('teacher')
			? 'teaches_in'
			: args.roles && args.roles.includes('student')
			? 'learns_in'
			: null
	if (addToClassrooms && pred) edges.push(...addToClassrooms.map((toUid) => [{ pred, toUid }, {}]))
	const newUser: UserType = await createNodeWithEdges(validatedUserData, edges)
	const fetched = await getUser({ uid: newUser.uid })
	return newUser
}
