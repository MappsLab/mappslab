// @flow
import dbClient from '../database/client'

export type DBEdge = {
	fromUid: string,
	pred: string,
	toUid: string,
}

export type PartialEdge =
	| {
			fromUid: string,
			pred: string,
	  }
	| {
			toUid: string,
			pred: string,
	  }

export type EdgeConfig = {
	unique?: boolean,
}

export type Txn = dbClient.newTxn

export type DBNode = Object & {
	uid: string,
}
