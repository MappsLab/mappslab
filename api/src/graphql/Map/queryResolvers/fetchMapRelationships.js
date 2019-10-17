// @flow
import deepMerge from 'deepmerge'
import type { MapType } from 'Types/MapTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import type { ImageType } from 'Types/ImageTypes'
import type { DataLayerType } from 'Types/DataLayerTypes'
import type { GraphQLContext, PageType, PaginationInput, GetNodeArgs } from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

type GetMapInput = {
	input: GetNodeArgs,
}

export const classroom = async (fetchedMap: MapType, _: GetMapInput, ctx: GraphQLContext): Promise<ClassroomType | null> => {
	const filter = { where: { classroomHasMap: { eq: fetchedMap.uid } } }
	const result = await ctx.models.Classroom.getClassrooms(filter, ctx.viewer)
	return result && result[0]
}

export const pins = async (fetchedMap: MapType, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType<PinType>> => {
	const mapFilter = {
		where: {
			pinnedInMap: {
				eq: fetchedMap.uid,
			},
		},
	}
	const mergedInput = deepMerge(input || {}, mapFilter)
	const fetchedPins = await ctx.models.Pin.getPins(mergedInput)

	return assemblePage(fetchedPins, input)
}

export const dataLayers = async (
	fetchedMap: MapType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<DataLayerType>> => {
	const mapFilter = {
		where: {
			dataLayerInMap: {
				eq: fetchedMap.uid,
			},
		},
	}

	const mergedInput = deepMerge(input || {}, mapFilter)
	const fetchedDataLayers = await ctx.models.DataLayer.getDataLayers(mergedInput)

	return assemblePage(fetchedDataLayers, input)
}

export const baseImage = async (fetchedMap: MapType, _: any, ctx: GraphQLContext): Promise<ImageType> => {
	const filter = { where: { hasImage: { eq: fetchedMap.uid } } }
	const result = await ctx.models.Image.getImages(filter)
	return result && result[0]
}

export const routes = async (
	fetchedMap: MapType,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<RouteType>> => {
	const mapFilter = {
		where: {
			routeWithinMap: { eq: fetchedMap.uid },
		},
	}
	const mergedInput = deepMerge(input || {}, mapFilter)
	const fetchedRoutes = await ctx.models.Route.getRoutes(mergedInput)
	return assemblePage(fetchedRoutes, input)
}
