import { Pin } from './Pin'
import { Classroom } from './Classroom'
import { Paginated } from './graphql'

type Role = 'teacher' | 'student' | 'admin'

export interface User {
	uid: string
	name: string
	roles: Role[]
	pins?: Paginated<Pin>
	classrooms?: Paginated<Classroom>
	__typename: 'User'
}

export interface JWT {
	token: string
	expires: string
}

export interface Viewer extends User {
	email: string
}
