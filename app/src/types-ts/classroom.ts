import { User } from './user'
import { Map } from './map'
import { Paginated } from './graphql'

export interface Classroom {
	uid: string
	title: string
	description?: string
	slug: string
	viewerIsTeacher?: boolean
	students?: Paginated<User>
	teachers?: Paginated<User>
	maps?: Paginated<Map>
	__typename: 'Classroom'
}
