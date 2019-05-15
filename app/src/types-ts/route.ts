import { Pin } from './pin'
import { User } from './user'
import { Paginated } from './graphql'

export interface Route {
	__typename: 'Route'
	uid: string
	title?: string
	owner?: Partial<User>
	description?: string
	pins?: Paginated<Pin>
}
