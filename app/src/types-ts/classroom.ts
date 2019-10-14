import { Paginated } from '@good-idea/unwind-edges'
import { User } from './user'
import { Map } from './map'

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
