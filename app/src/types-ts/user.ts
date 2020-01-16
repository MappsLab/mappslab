import { Paginated } from '@good-idea/unwind-edges'
import { Node } from './shared'
import { Pin } from './pin'
import { Classroom } from './classroom'

type Role = 'teacher' | 'student' | 'admin'

export interface User extends Node {
	uid: string
	__typename: 'User'
	name: string
	roles: Role[]
	pins?: Paginated<Pin>
	classrooms?: Paginated<Classroom>
}

export interface JWT {
	token: string
	expires: string
}

export interface Viewer extends User {
	email: string
}
