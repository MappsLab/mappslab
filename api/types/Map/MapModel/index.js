// @flow
import { getMap, getMaps } from './readMap'
import { updateMap } from './updateMap'
import { createMap } from './createMap'
import { deleteMap } from './deleteMap'
import { getClassroomMaps, getPinMaps } from './readMapRelationships'

export default  {
	getMap,
	getMaps,
	updateMap,
	createMap,
	deleteMap,
	// Relationships
	getClassroomMaps,
	getPinMaps,
}
