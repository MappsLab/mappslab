import { Node } from './shared'

export interface DataLayer extends Node {
	uid: string
	title: string
	uri: string
	__typename: 'DataLayer'
}
