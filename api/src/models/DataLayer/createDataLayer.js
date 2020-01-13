// @flow
import uuidv1 from 'uuid/v1'
import { upload } from 'Services/aws'
import { streamToBuffer } from 'Utils/media'
import type { DataLayerType, NewDataLayerData } from 'Types/DataLayer'
import { createNodeWithEdges } from 'Database'
import { validateNew } from './dataLayerDBSchema'
import config from '../../config'

const kmlDirectory = config.get('aws.kmlDirectory')

export const createDataLayer = async ({
	title,
	kml,
	addToMaps,
}: NewDataLayerData): Promise<DataLayerType> => {
	const { filename, createReadStream } = await kml
	const buffer = await streamToBuffer(createReadStream())
	const uuid = uuidv1()
	const fileName = `${kmlDirectory}/${filename.replace(
		/\.kml$/i,
		'',
	)}-${uuid}.kml`

	const uploaded = await upload(buffer, fileName)

	const uri = uploaded.Key
	const validated = await validateNew({ title, uri })
	const edges = []

	if (addToMaps)
		edges.push(
			...addToMaps.map((fromUid) => [{ fromUid, pred: 'has_dataLayer' }]),
		)

	const dataLayer: DataLayerType = await createNodeWithEdges(validated, edges)
	return dataLayer
}

