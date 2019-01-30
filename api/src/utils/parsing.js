// @flow
import { head, lensPath, path, over } from 'ramda'

const makeSingle = (obj: any) =>
	Array.isArray(obj)
		? // if this is an array, return [0]
		  head(obj)
		: // otherwise, return as-is
		  obj

const makeFieldSingle = (fieldPath: Array<string | number>, obj: any) =>
	// $FlowFixMe
	path(fieldPath, obj)
		? // if a prop exists at this path, apply the lens
		  over(
				lensPath(fieldPath), // identify which field we want to get & set
				makeSingle, // apply the fn
				obj, // to the source object
		  )
		: // otherwise, return as-is. (This prevents the reation of { prop: { prop: undefined }})
		  obj

export const parseSingularFields = (singularFields: Array<string>) => (obj: any): any =>
	singularFields.reduce(
		(acc, fieldPath) =>
			// apply the lens fn to each field path
			// $FlowFixMe ramda is annoying
			makeFieldSingle(fieldPath.split('.'), acc),
		obj,
	)
