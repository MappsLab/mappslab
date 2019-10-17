// @flow
import type { DataLayerType, NewDataLayerData } from 'Types/DataLayer'
import { createNodeWithEdges } from 'Database'
import { validateNew } from './dataLayerDBSchema'

export const createDataLayer = async (args: NewDataLayerData): Promise<DataLayerType> => {
	const { addToMaps, ...dataLayerData } = args
	const validated = await validateNew(dataLayerData)
	const edges = []

	if (addToMaps) edges.push(...addToMaps.map((fromUid) => [{ fromUid, pred: 'has_dataLayer' }]))

	const dataLayer: DataLayerType = await createNodeWithEdges(validated, edges)
	return dataLayer
}
