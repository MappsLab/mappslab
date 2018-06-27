// @flow
import type { $Request } from 'express'
import User from './types/User/UserModel'
import Pin from './types/Pin/PinModel'
import Classroom from './types/Classroom/ClassroomModel'
import Route from './types/Route/RouteModel'

const context = ({ request }: { request: $Request }) => {
	const { session, viewer } = request
	return {
		session,
		viewer,
		models: {
			Classroom,
			Pin,
			Route,
			User,
		},
	}
}

export default context
