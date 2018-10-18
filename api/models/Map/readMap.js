// @flow
import { query } from 'Database'
import type { MapType } from 'Types/MapTypes'
import type { UserType } from 'Types/UserTypes'
import type { GetNodeArgs, PaginationFilterArgs } from 'Types/sharedTypes'
import { validateUid, makeFilterString, makePaginationString } from 'Database/utils'
import { publicFields, parseMapResult, parseMapResults } from './mapDBSchema'

// const debug = require('debug')('api')

export const getMap = async (args: GetNodeArgs): Promise<MapType | null> => {
	const key = Object.keys(args)[0]
	if (!key || (key !== 'slug' && key !== 'uid')) throw new Error('getMap must be called with a `uid` or a `slug`')
	if (typeof args.uid === 'string' && key === 'uid' && !validateUid(args.uid)) throw new Error(`Uid ${args.uid} is malformed`)
	const func = key === 'uid' && typeof args.uid === 'string' ? `uid(${args.uid})` : `eq(${key}, $${key})`
	const q = /* GraphQL */ `
		query getMap($${key}: string) {
			getMap(func: ${func}) {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q, args)
	return parseMapResult(result.getMap)
}

export const getMaps = async (args?: PaginationFilterArgs = {}): Promise<Array<MapType>> => {
	const { first, after, where } = args
	const filterString = makeFilterString(where)
	const paginationString = makePaginationString(first, after)
	const q = /* GraphQL */ `
		query getMaps {
			getMaps(func: eq(type, "map") ${paginationString}) ${filterString} {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q)
	if (!result || !result.getMaps) return []
	return parseMapResults(result.getMaps)
}

export const getMapsByUser = async (user: UserType /* args?: PaginationFilterArgs */): Promise<Array<MapType>> => {
	const q = /* GraphQL */ `
		query getMapsByUser {
			Maps(func: eq(type, "Map")) @filter(uid_in(~learns_in, ${user.uid})) {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q)
	return result.Maps || []
}
