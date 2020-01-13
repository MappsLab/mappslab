// @flow

import type { DataLayerType } from 'Types/DataLayerTypes'
import type {
	PageType,
	GetNodeInput,
	PaginationInput,
	GraphQLContext,
} from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const dataLayer = async (
	_: Object,
	{ input }: GetNodeInput,
	ctx: GraphQLContext,
): Promise<DataLayerType | null> =>
	ctx.models.DataLayer.getDataLayer(input, ctx.viewer)

export const dataLayers = async (
	_: Object,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<DataLayerType>> => {
	const fetchedDataLayers = await ctx.models.DataLayer.getDataLayers(
		input,
		ctx.viewer,
	)
	const page = assemblePage(fetchedDataLayers, input)
	return page
}
