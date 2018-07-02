// @flow
import { getMap, getMaps } from './readMap'
import { updateMap } from './updateMap'
import { createMap } from './createMap'
import { deleteMap } from './deleteMap'
import { getMapsByClassroom } from './readMapRelationships'

module.exports = {
	getMap,
	getMaps,
	updateMap,
	createMap,
	deleteMap,
	getMapsByClassroom,
}
