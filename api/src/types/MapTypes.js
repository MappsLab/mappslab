// @flow
import type { UserType } from 'Types/UserTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PinType } from 'Types/PinTypes'
import type { ImageType, ImageUpload } from 'Types/ImageTypes'
import type { DataLayerType, NewDataLayerInput } from 'Types/DataLayerTypes'
import type { RouteType } from './RouteTypes'

export type MapType = {
	uid: string,
	title?: string,
	owner?: UserType,
	collaborators?: Array<UserType>,
	classroom?: ClassroomType,
	pins?: Array<PinType>,
	routes?: Array<RouteType>,
	baseImage?: ImageType,
	dataLayers?: Array<DataLayerType>,
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
	dataLayer?: NewDataLayerInput;
}
