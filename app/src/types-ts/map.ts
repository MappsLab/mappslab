// @flow
import { Pin } from './pin'
import { Route } from './route'
import { Classroom } from './classroom'
import { Image } from './media'

export interface Map {
	title: string
	uid: string
	__typename: 'Map'
	classroom: Classroom
	description?: string
	lessons?: any[]
	pins?: Pin[]
	routes?: Route[]
	baseImage?: Image
}
