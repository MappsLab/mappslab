// @flow
import { query } from 'Database'
import { createQueryStrings } from 'Database/utils'
import type { DataLayerType } from 'Types/DataLayerTypes'
import type { PaginationFilterArgs } from 'Types/sharedTypes'
import { publicFields } from './dataLayerDBSchema'

export const getDataLayers = async (
	args?: PaginationFilterArgs = {},
): Promise<Array<DataLayerType>> => {
	const { varBlocks, filterString, paginationString } = createQueryStrings(args)
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
