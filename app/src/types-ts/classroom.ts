import { User } from './user'
import { Map } from './map'

export interface Classroom {
	uid: string
	title: string
	description?: string
	slug: string
	viewerIsTeacher?: boolean
	students?: User[]
	teachers?: User[]
	maps?: Map[]
	__typename: 'Classroom'
}
