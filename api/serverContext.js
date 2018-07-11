// @flow
import type { $Request } from 'express'
import User from './types/User/UserModel'
import Pin from './types/Pin/PinModel'
import Classroom from './types/Classroom/ClassroomModel'
import Route from './types/Route/RouteModel'
import Map from './types/Map/MapModel'

export const models = {
	Classroom,
	Pin,
	Route,
	User,
	Map,
}

const context = (ctx: { request: $Request }) => {
	if (!ctx.request) return { ...ctx, models }
	const { session, viewer } = ctx.request
	return {
		session,
		viewer,
		models,
	}
}

export default context
