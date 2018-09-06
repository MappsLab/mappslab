// @flow
import type { NewUserData, UserType } from 'Types/UserTypes'
import { ValidationError } from 'Errors'
import { createNode } from 'Database'
import { clean, defaultValues, validateNew } from './userDBSchema'

const debug = require('debug')('api:user')

export const createUser = async (userData: NewUserData): Promise<UserType> => {
	const cleaned = await clean({ ...defaultValues, ...userData, createdAt: new Date() })
	const validatedUserData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	// $FlowFixMe TODO
	return createNode(validatedUserData)
}
