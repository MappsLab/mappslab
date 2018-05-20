// @flow
import { getUser, getUsers } from './readUser'
import { updateUser } from './updateUser'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { checkPassword } from './userAuth'

module.exports = {
	getUser,
	getUsers,
	updateUser,
	createUser,
	deleteUser,
	checkPassword,
}
