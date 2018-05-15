import { getUser, getUsers, getViewer } from './userRead'
import { getFollowers, createFriendship, removeFriendship } from './userSocial'
import { updateUser } from './userUpdate'
import { createUser, removeUser } from './userCreation'
import { checkPassword } from './userAuth'

module.exports = {
	getUser,
	getUsers,
	getViewer,
	getFollowers,
	checkPassword,
	createUser,
	createFriendship,
	removeFriendship,
	removeUser,
	updateUser,
}
