// @flow
import dbClient from 'Database/client'
import type { MapType } from 'Types/MapTypes'
import type { UserType } from 'Types/UserTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PinType } from 'Types/PinTypes'

export type Facet = { [key: string]: string | boolean | number | Date }

export type DBEdge = {
	fromUid: string,
	pred: string,
	toUid: string,
	facets?: Array<Facet>,
}

export type PartialEdge =
	| {
			fromUid: string,
			pred: string,
			facets?: Array<Facet>,
	  }
	| {
			toUid: string,
			pred: string,
			facets?: Array<Facet>,
	  }

export type EdgeConfig = {
	unique?: boolean,
}

export type EdgeInput = [PartialEdge, EdgeConfig]

export type Txn = dbClient.newTxn

export type DBNode = MapType | UserType | ClassroomType | PinType

export type TxnWithNode = {
	txn: Txn,
	data: DBNode,
}
