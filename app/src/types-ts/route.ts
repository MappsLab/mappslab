import { Pin } from './pin'
import { User } from './user'

export interface Route {
	__typename: 'Route'
	uid: string
	title?: string
	owner?: Partial<User>
	description?: string
	pins?: Pin[]
}
