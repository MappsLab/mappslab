// @flow
import type { MapType, UpdateMapData } from 'Types/MapTypes'
import { mutateNode, createEdge, removeEdge } from 'Database'
import { clean, validateUpdate } from './mapDBSchema'
import Image from '../Image'
import Tileset from '../Tileset'

export const updateMap = async (args: UpdateMapData): Promise<MapType> => {
	const { uid, baseImage, ...mapData } = args
	const cleaned = await clean(mapData)
	const validatedMapData = validateUpdate(cleaned)
	// $FlowFixMe
	const updatedMap: MapType = await mutateNode(uid, { data: validatedMapData })

	if (baseImage) {
		const mapBaseImage = await Image.createImage(baseImage)
		Tileset.createTileSet(baseImage, mapBaseImage)
		await createEdge({ fromUid: uid, pred: 'has_image', toUid: mapBaseImage.uid }, { unique: true })
	} else if (baseImage === null) {
		await removeEdge({ fromUid: uid, pred: 'has_image', toUid: '*' })
	}

	return updatedMap
}
