import { User } from './user'
import { Route } from './route'
import { Image } from './media'

export interface Pin {
	__typename: 'Pin'
	uid: string
	lat: number
	lng: number
	owner?: User
	title?: string
	description?: string
	route?: {
		route: Route
		isFirst: boolean
		isLast: boolean
		nextPin?: Pin
		prevPin?: Pin
	}
	image?: Image
	video?: string
}
