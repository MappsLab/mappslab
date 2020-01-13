// @flow
import { head } from 'ramda'
import { query } from 'Database'
import { createQueryStrings } from 'Database/utils'
import type { DataLayerType } from 'Types/DataLayerTypes'
import type { PaginationFilterArgs } from 'Types/sharedTypes'
import type { ViewerType } from 'Types/UserTypes'
import { publicFields } from './dataLayerDBSchema'

export const getDataLayer = async (
	input: GetNodeInput,
	viewer: ViewerType,
): Promise<DataLayerType | null> => {
	const { uid } = input
	const q = /* GraphQL */ `
    query getDataLayer {
      getDataLayer(func: uid(${uid})) {
        ${publicFields}
      }
    }
  `
	const variables = { uid }
	const result = await query(q, variables)
	const dataLayer = head(result.getDataLayer)

	if (!dataLayer || dataLayer.type !== 'dataLayer') return null
	return dataLayer
}

export const getDataLayers = async (
	args?: PaginationFilterArgs = {},
): Promise<Array<DataLayerType>> => {
	const { varBlocks, filterString, paginationString } = createQueryStrings({
		...args,
		where: {
			uri: {
				exists: true,
			},
			...args.where,
		},
	})
	const q = /* GraphQL */ `
		query getDataLayers{
			${varBlocks}
			getDataLayers(func: eq(type, "dataLayer") ${paginationString}) ${filterString} {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	if (!result || !result.getDataLayers.length) return []
	return result.getDataLayers
}
