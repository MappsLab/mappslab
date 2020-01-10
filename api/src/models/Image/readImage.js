// @flow
import { query } from 'Database'
import { createQueryStrings } from 'Database/utils'
import type { ImageType } from 'Types/ImageTypes'
import type { PaginationFilterArgs } from 'Types/sharedTypes'
import { publicFields } from './imageDBSchema'

export const getImages = async (
	args?: PaginationFilterArgs = {},
): Promise<Array<ImageType>> => {
	const { varBlocks, filterString, paginationString } = createQueryStrings(args)
	const q = /* GraphQL */ `
		query getImages {
			${varBlocks}
			getImages(func: eq(type, "image") ${paginationString}) ${filterString} {
				${publicFields}
			}
		}
	`

	const result = await query(q)
	if (!result || !result.getImages) return []
	return result.getImages
}
