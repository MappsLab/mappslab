// @flow

import type { UserType } from 'Types/UserTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from './RouteTypes'
import type { ImageType, ImageUpload } from 'Types/ImageTypes'

export type MapType = {
	uid: string,
	title?: string,
	owner?: UserType,
	collaborators?: Array<UserType>,
	classroom?: ClassroomType,
	pins?: Array<PinType>,
	routes?: Array<RouteType>,
	baseImage?: ImageType,
}

export type NewMapData = {
	title: string,
	description?: string,
	addToClassrooms: Array<string>,
}

export interface UpdateMapData {
	uid: string;
	title?: string;
	description?: string;
	baseImage?: ImageUpload;
}
