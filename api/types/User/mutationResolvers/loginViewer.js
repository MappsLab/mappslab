// @flow
import { checkPassword } from '../UserModel'
import type { Credentials, ViewerType } from '../UserTypes'
import type { JWT } from '../../../utils/auth'
import { createJWT } from '../../../utils/auth'

const loginViewerMutation = async (
	_: mixed,
	args: { credentials: Credentials },
): Promise<{ viewer: ViewerType, jwt: JWT } | Error> => {
	const { credentials } = args
	const viewer = await checkPassword(credentials).catch((e) => {
		throw e
	})
	const jwt = createJWT(viewer)
	return {
		viewer,
		jwt,
	}
}

export default loginViewerMutation
