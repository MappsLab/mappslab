import { Node } from './shared'
import { Paginated } from '@good-idea/unwind-edges'
import { Pin } from './pin'
import { User } from './user'
import { Image, Video } from './media'

export interface Route extends Node {
	uid: string
	__typename: 'Route'
	title?: string
	owner?: Partial<User>
	description?: string
	image?: Image
	video?: Video
	pins?: Paginated<Pin>
}
