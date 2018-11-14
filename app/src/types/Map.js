// @flow
import type { PinType } from './Pin'
import type { ClassroomType } from './Classroom'

export type MapType = {
	title: string,
	uid: string,
	classroom: ClassroomType,
	description?: string,
	lessons?: Array<any>,
	pins?: Array<PinType>,
}