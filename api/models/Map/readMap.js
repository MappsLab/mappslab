// @flow
import { query } from 'Database'
import type { MapType } from 'Types/MapTypes'
import type { UserType } from 'Types/UserTypes'
import type { GetNodeArgs } from 'Types/sharedTypes'
import { validateUid } from 'Database/utils'
import { publicFields } from './mapDBSchema'

const debug = require('debug')('api')

export const getMap = async (args: GetNodeArgs): Promise<MapType | null | Error> => {
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
	const map = result.getMap[0]
	return map
}

export const getMaps = async (/* args?: PaginationArgs */): Promise<Array<MapType>> => {
	// const { first, after, filter } = makePaginationArgs(args)
	// const filterString = filter ? createFilterString(filter) : ''
	const filterString = ''
	const q = /* GraphQL */ `
		query getMaps {
			Maps(func: eq(type, "map")) ${filterString} {
				${publicFields}
			}
		}
	`
	const result: Object = await query(q).catch((err) => {
		debug('Error in getMaps:')
		debug(err)
		throw err
	})

	return result.Maps || []
}

export const getMapsByUser = async (user: UserType /* args?: PaginationArgs */): Promise<Array<MapType> | Error> => {
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
