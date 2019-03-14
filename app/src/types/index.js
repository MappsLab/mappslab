// @flow

export type * from './User'
export type * from './Pin'
export type * from './Map'
export type * from './Classroom'
export type * from './GraphQL'
// export type * from './Statechart'
export type * from './Route'

/* I'm not doing this right. An interface should include the common fields, here I'm throwing everything in */
export interface Node {
	uid: string;
	__typename: string;
	title?: string;
	name?: string;
	slug?: string;
	description?: string;
	roles?: Array<string>;
}
