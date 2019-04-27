import { Pin } from './Pin'
import { Classroom } from './Classroom'

type Role = 'teacher' | 'student' | 'admin'

export interface User {
	uid: string
	name: string
	roles: Role[]
	pins?: Pin[]
	classrooms?: Classroom[]
	__typename: 'User'
}

export interface JWT {
	token: string
	expires: string
}
