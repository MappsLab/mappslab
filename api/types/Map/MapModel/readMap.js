// @flow
import { head } from 'ramda'
import { query } from '../../../database'
import type { MapType } from '../MapTypes'
import type { UserType } from '../../User/UserTypes'
import type { PaginationArgs, GetNodeArgs } from '../../shared/sharedTypes'
import { publicFields } from './mapDBSchema'
import { validateUid } from '../../../database/utils'

const debug = require('debug')('api')

export const getMap = async (args: GetNodeArgs): Promise<MapType | null | Error> => {
	const key = head(Object.keys(args))
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
	const map = head(result.getMap)
	return map
}

export const getMaps = async (args?: PaginationArgs): Promise<Array<MapType>> => {
	// const { first, after, filter } = makePaginationArgs(args)
	// const filterString = filter ? createFilterString(filter) : ''
	const filterString = ''
	const q = /* GraphQL */ `
		query getMaps {
			Maps(func: eq(type, "Map")) ${filterString} {
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

export const getMapsByUser = async (user: UserType, args?: PaginationArgs): Promise<Array<MapType> | Error> => {
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
