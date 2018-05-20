// @flow
import { pipe, prop, map, path as rPath, head } from 'ramda'
import { arrayify } from './'
import type { Edge } from '../types/shared/sharedTypes'

export const nodesToEdges = (arr: Array<Object>): Array<Edge> => arr.map((node) => ({ cursor: node.uid, node }))
