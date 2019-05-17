// @flow
import type { ImageType } from 'Types/ImageTypes'
import type { TilesetType } from 'Types/TilesetTypes'
import type { GraphQLContext } from 'Types/sharedTypes'

export const tileset = async (fetchedImage: ImageType, args: any, ctx: GraphQLContext): Promise<TilesetType | null> => {
	const filter = { where: { hasTileset: { eq: fetchedImage.uid } } }
	const tilesetResult = await ctx.models.Tileset.getTileset(filter)
	return tilesetResult || null
}
