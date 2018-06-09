// @flow
import * as R from 'ramda'

export const getFilenameFromURL = R.pipe(R.split('/'), R.last)

export const deserializeQueryString = R.pipe(R.replace(/^\?/, ''), R.split('&'), R.map(R.split('=')), R.fromPairs)
