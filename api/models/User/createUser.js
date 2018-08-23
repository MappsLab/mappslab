// @flow
import type { UserType } from '../UserTypes'
import { clean, defaultValues, validateNew } from './userDBSchema'
import { ValidationError } from 'Errors'
import { createNode } from 'Database'

const debug = require('debug')('api:user')

export const createUser = async (userData: UserType): Promise<UserType | void> => {
	const cleaned = await clean({ ...defaultValues, ...userData, createdAt: new Date() })
	const validatedUserData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	return createNode(validatedUserData)
}
