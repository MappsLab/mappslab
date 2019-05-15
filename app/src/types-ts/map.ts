import { Pin } from './pin'
import { Route } from './route'
import { Classroom } from './classroom'
import { Image } from './media'
import { Paginated } from './graphql'

export interface Map {
	title: string
	uid: string
	__typename: 'Map'
	classroom: Classroom
	description?: string
	// lessons?: any[]
	pins?: Paginated<Pin>
	routes?: Paginated<Route>
	baseImage?: Image
}
