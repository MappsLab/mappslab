// @flow
import type { PinType } from './Pin'
import type { UserType } from './User'
import type { ClassroomType } from './Classroom'

export type MapType = {
	title: string,
	uid: string,
	pins: Array<PinType>,
	owner: UserType,
	classroom: ClassroomType,
}
