import { Map, User, Classroom, DataLayer } from './generated'

export * from './generated'
export * from './googlemaps'

export type Viewer = User

export type NodeType = Map | User | Classroom | DataLayer

export type Video = string
