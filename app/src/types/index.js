// @flow

export type * from './User'
export type * from './Pin'
export type * from './Map'
export type * from './Classroom'
export type * from './GraphQL'
// export type * from './Statechart'
export type * from './Route'

export type Node = {
	uid: string,
	__typename: 'User' | 'Classroom' | 'Map' | 'Pin' | 'Route',
	title?: string,
	name?: string,
}
