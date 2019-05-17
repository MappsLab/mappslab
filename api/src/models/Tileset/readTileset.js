// @flow
import { query } from 'Database'
import { createQueryStrings } from 'Database/utils'
import type { TilesetType } from 'Types/TilesetTypes'
import type { PaginationFilterArgs } from 'Types/sharedTypes'
import { publicFields } from './tilesetDBSchema'

export const getTileset = async (args?: PaginationFilterArgs = {}): Promise<TilesetType | null> => {
	const { varBlocks, filterString, paginationString } = createQueryStrings(args)
	const q = /* GraphQL */ `
		query getTileset {
			${varBlocks}
			getTileset(func: eq(type, "tileset") ${paginationString}) ${filterString} {
				${publicFields}
			}
		}
	`

	const result = await query(q)
	if (!result || !result.getTileset.length) return null
	return result.getTileset[0]
}
