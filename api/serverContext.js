// @flow
import type { $Request } from 'express'
import User from './types/User/UserModel'
import Pin from './types/Pin/PinModel'
import Classroom from './types/Classroom/ClassroomModel'
import Route from './types/Route/RouteModel'

export const models = {
	Classroom,
	Pin,
	Route,
	User,
}

const context = ({ request }: { request: $Request }) => {
	const { session, viewer } = request
	return {
		session,
		viewer,
		models,
	}
}

export default context
