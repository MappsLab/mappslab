export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	/** The `Upload` scalar type represents a file upload. */
	Upload: any
	DateTime: Date
	/** Represents an arbitrary object. */
	Object: any
}

export type AddPinToRouteInput = {
	/** if no connectToPin is supplied, a new route will be created */
	connectToPin: Scalars['String']
	/** if no position is supplied, defaults to 'AFTER' */
	position?: Maybe<Position>
}

export type BooleanOperators = {
	eq?: Maybe<Scalars['Boolean']>
}

export enum CacheControlScope {
	Public = 'PUBLIC',
	Private = 'PRIVATE',
}

export interface Classroom extends Node {
	__typename: 'Classroom'
	uid: Scalars['String']
	title?: Maybe<Scalars['String']>
	slug?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	students?: Maybe<UserConnection>
	teachers?: Maybe<UserConnection>
	viewerIsTeacher: Scalars['Boolean']
	maps?: Maybe<MapConnection>
}

export interface ClassroomConnection extends Connection {
	__typename: 'ClassroomConnection'
	pageInfo: PageInfo
	edges: Array<Maybe<ClassroomEdge>>
}

export interface ClassroomEdge extends Edge {
	__typename: 'ClassroomEdge'
	cursor: Scalars['String']
	node?: Maybe<Classroom>
}

export type ClassroomFilterParameter = {
	title?: Maybe<StringOperators>
}

export type ClassroomListOptions = {
	first?: Maybe<Scalars['Int']>
	after?: Maybe<Scalars['String']>
	sort?: Maybe<ClassroomSortParameter>
	where?: Maybe<ClassroomFilterParameter>
}

export type ClassroomSortParameter = {
	title?: Maybe<SortOrder>
}

export type Connection = {
	pageInfo: PageInfo
}

export type CreateAdminInput = {
	name: Scalars['String']
	email: Scalars['String']
	temporaryPassword?: Maybe<Scalars['String']>
}

export type CreateMapInput = {
	title: Scalars['String']
	description?: Maybe<Scalars['String']>
	addToClassrooms?: Maybe<Array<Scalars['String']>>
}

export type CreateStudentInput = {
	name: Scalars['String']
	email?: Maybe<Scalars['String']>
	temporaryPassword: Scalars['String']
	addToClassrooms?: Maybe<Array<Scalars['String']>>
}

export type CreateTeacherInput = {
	name: Scalars['String']
	email: Scalars['String']
	temporaryPassword?: Maybe<Scalars['String']>
	addToClassrooms?: Maybe<Array<Scalars['String']>>
}

export type CredentialsInput = {
	email?: Maybe<Scalars['String']>
	uid?: Maybe<Scalars['String']>
	password: Scalars['String']
}

export interface DataLayer extends Node {
	__typename: 'DataLayer'
	uid: Scalars['String']
	uri: Scalars['String']
	title: Scalars['String']
}

export interface DataLayerConnection extends Connection {
	__typename: 'DataLayerConnection'
	pageInfo: PageInfo
	edges: Array<Maybe<DataLayerEdge>>
}

export interface DataLayerEdge extends Edge {
	__typename: 'DataLayerEdge'
	cursor: Scalars['String']
	node?: Maybe<DataLayer>
}

export type DataLayerInput = {
	kml: Scalars['Upload']
	title: Scalars['String']
}

export type DataLayerSortParameters = {
	title?: Maybe<Scalars['String']>
}

export type DataLayerWhereParameters = {
	title?: Maybe<StringOperators>
}

export type DateOperators = {
	eq?: Maybe<Scalars['DateTime']>
	notEq?: Maybe<Scalars['DateTime']>
	before?: Maybe<Scalars['DateTime']>
	after?: Maybe<Scalars['DateTime']>
	between?: Maybe<DateRange>
}

export type DateRange = {
	start: Scalars['DateTime']
	end: Scalars['DateTime']
}

export type Edge = {
	cursor: Scalars['String']
}

export type GetDataLayerInput = {
	uid: Scalars['String']
}

export type GetDataLayersInput = {
	first?: Maybe<Scalars['Int']>
	after?: Maybe<Scalars['String']>
	sort?: Maybe<DataLayerSortParameters>
	where?: Maybe<DataLayerWhereParameters>
}

export type GetMapInput = {
	uid: Scalars['String']
}

export type GetNodeInput = {
	uid?: Maybe<Scalars['String']>
	slug?: Maybe<Scalars['String']>
}

export type GetPinInput = {
	uid: Scalars['String']
}

export type GetRouteInput = {
	uid: Scalars['String']
}

export type GetUserInput = {
	uid?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
}

export interface Image extends Node {
	__typename: 'Image'
	uid: Scalars['String']
	sizes?: Maybe<Array<Maybe<ImageSize>>>
	original?: Maybe<ImageSize>
	tileset?: Maybe<Tileset>
}

export interface ImageSize {
	__typename: 'ImageSize'
	format: Scalars['String']
	uri: Scalars['String']
	width: Scalars['Int']
	height: Scalars['Int']
	label?: Maybe<Scalars['String']>
}

export type ListOperators = {
	includes?: Maybe<Scalars['String']>
}

export type LoginResult = LoginSuccess | RequiresReset

export interface LoginSuccess {
	__typename: 'LoginSuccess'
	jwt?: Maybe<Token>
	viewer?: Maybe<User>
}

export interface Map extends Node {
	__typename: 'Map'
	uid: Scalars['String']
	title?: Maybe<Scalars['String']>
	slug?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	classroom?: Maybe<Classroom>
	pins?: Maybe<PinConnection>
	routes?: Maybe<RouteConnection>
	dataLayers?: Maybe<DataLayerConnection>
	baseImage?: Maybe<Image>
}

export interface MapConnection extends Connection {
	__typename: 'MapConnection'
	pageInfo: PageInfo
	edges: Array<Maybe<MapEdge>>
}

export interface MapEdge extends Edge {
	__typename: 'MapEdge'
	cursor: Scalars['String']
	node?: Maybe<Map>
}

export type MapFilterParameter = {
	title?: Maybe<StringOperators>
}

export type MapListOptions = {
	first?: Maybe<Scalars['Int']>
	after?: Maybe<Scalars['String']>
	sort?: Maybe<MapSortParameter>
	where?: Maybe<MapFilterParameter>
}

export type MapSortParameter = {
	title?: Maybe<SortOrder>
}

export interface MapSubscription {
	__typename: 'MapSubscription'
	map: Map
}

export type MapUpdatedInput = {
	mapUid: Scalars['String']
}

export interface Mutation {
	__typename: 'Mutation'
	dummy?: Maybe<Scalars['String']>
	createClassroom: Classroom
	updateClassroom: Classroom
	removeClassroom: Scalars['Boolean']
	createMap: Map
	updateMap: Map
	deleteMap: Scalars['Boolean']
	createPin: Pin
	updatePin: Pin
	deletePin: Success
	createRoute: Route
	addPinToRoute: Route
	updateRoute: Route
	deleteRoute: Scalars['Boolean']
	loginViewer: LoginResult
	createStudent: User
	createTeacher: User
	createAdmin: User
	updateUser: User
	/** deleteUser(uid: String!): Boolean! */
	requestPasswordReset: Success
	resetPassword: LoginResult
	setTemporaryPassword: Success
}

export type MutationCreateClassroomArgs = {
	input: NewClassroomInput
}

export type MutationUpdateClassroomArgs = {
	input: UpdateClassroomInput
}

export type MutationRemoveClassroomArgs = {
	uid: Scalars['String']
}

export type MutationCreateMapArgs = {
	input: CreateMapInput
}

export type MutationUpdateMapArgs = {
	input: UpdateMapInput
}

export type MutationDeleteMapArgs = {
	input: GetMapInput
}

export type MutationCreatePinArgs = {
	input: NewPinInput
}

export type MutationUpdatePinArgs = {
	input: UpdatePinInput
}

export type MutationDeletePinArgs = {
	input: GetPinInput
}

export type MutationCreateRouteArgs = {
	input: NewRouteInput
}

export type MutationAddPinToRouteArgs = {
	input: AddPinToRouteInput
}

export type MutationUpdateRouteArgs = {
	input: UpdateRouteInput
}

export type MutationDeleteRouteArgs = {
	uid: Scalars['String']
}

export type MutationLoginViewerArgs = {
	input: CredentialsInput
}

export type MutationCreateStudentArgs = {
	input: CreateStudentInput
}

export type MutationCreateTeacherArgs = {
	input: CreateTeacherInput
}

export type MutationCreateAdminArgs = {
	input: CreateAdminInput
}

export type MutationUpdateUserArgs = {
	input: UpdateUserInput
}

export type MutationRequestPasswordResetArgs = {
	input?: Maybe<GetUserInput>
}

export type MutationResetPasswordArgs = {
	input: UpdatePasswordInput
}

export type MutationSetTemporaryPasswordArgs = {
	input: SetTemporaryPasswordInput
}

export type NewClassroomInput = {
	title: Scalars['String']
	description?: Maybe<Scalars['String']>
	addTeachers?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type NewPinInput = {
	title?: Maybe<Scalars['String']>
	draft?: Maybe<Scalars['Boolean']>
	color?: Maybe<Scalars['String']>
	lat: Scalars['Float']
	lng: Scalars['Float']
	description?: Maybe<Scalars['String']>
	deleted?: Maybe<Scalars['Boolean']>
	addToMaps: Array<Maybe<Scalars['String']>>
	lessonUids?: Maybe<Array<Maybe<Scalars['String']>>>
	addToRoute?: Maybe<AddPinToRouteInput>
	image?: Maybe<Scalars['Upload']>
	imageUrl?: Maybe<Scalars['String']>
	video?: Maybe<Scalars['String']>
}

export type NewRouteInput = {
	title?: Maybe<Scalars['String']>
	addPin?: Maybe<Scalars['String']>
	pins?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type Node = {
	uid: Scalars['String']
}

export type NumberOperators = {
	eq?: Maybe<Scalars['Float']>
	notEq?: Maybe<Scalars['Float']>
	lt?: Maybe<Scalars['Float']>
	lte?: Maybe<Scalars['Float']>
	gt?: Maybe<Scalars['Float']>
	gte?: Maybe<Scalars['Float']>
	between?: Maybe<NumberRange>
}

export type NumberRange = {
	start: Scalars['Float']
	end: Scalars['Float']
}

export interface PageInfo {
	__typename: 'PageInfo'
	hasNextPage: Scalars['Boolean']
	hasPrevPage: Scalars['Boolean']
	lastCursor?: Maybe<Scalars['String']>
}

export type PaginationInput = {
	first?: Maybe<Scalars['Int']>
	after: Scalars['String']
}

export interface Pin extends Node {
	__typename: 'Pin'
	uid: Scalars['String']
	title?: Maybe<Scalars['String']>
	lat: Scalars['Float']
	lng: Scalars['Float']
	description?: Maybe<Scalars['String']>
	color?: Maybe<Scalars['String']>
	owner?: Maybe<User>
	maps?: Maybe<MapConnection>
	route?: Maybe<PinInRoute>
	draft?: Maybe<Scalars['Boolean']>
	image?: Maybe<Image>
	video?: Maybe<Scalars['String']>
	imageUrl?: Maybe<Scalars['String']>
}

export interface PinConnection extends Connection {
	__typename: 'PinConnection'
	pageInfo: PageInfo
	edges: Array<Maybe<PinEdge>>
}

export interface PinEdge extends Edge {
	__typename: 'PinEdge'
	cursor: Scalars['String']
	node?: Maybe<Pin>
}

export type PinFilterParameter = {
	title?: Maybe<StringOperators>
	/** Pin-specific relationship filters */
	pinnedByUser?: Maybe<RelationshipOperators>
	pinnedInMap?: Maybe<RelationshipOperators>
}

export interface PinInRoute {
	__typename: 'PinInRoute'
	route: Route
	nextPin?: Maybe<Pin>
	prevPin?: Maybe<Pin>
	isFirst: Scalars['Boolean']
	isLast: Scalars['Boolean']
}

export type PinListOptions = {
	first?: Maybe<Scalars['Int']>
	after?: Maybe<Scalars['String']>
	sort?: Maybe<PinSortParameter>
	where?: Maybe<PinFilterParameter>
}

export type PinSortParameter = {
	title?: Maybe<SortOrder>
	lat?: Maybe<SortOrder>
	lng?: Maybe<SortOrder>
}

export interface PinSubscription {
	__typename: 'PinSubscription'
	pin: Pin
}

export type PinSubscriptionInput = {
	mapUid: Scalars['String']
}

export enum Position {
	Before = 'BEFORE',
	After = 'AFTER',
}

export interface Query {
	__typename: 'Query'
	dummy?: Maybe<Scalars['String']>
	classroom?: Maybe<Classroom>
	classrooms: ClassroomConnection
	map?: Maybe<Map>
	maps: MapConnection
	pin?: Maybe<Pin>
	pins?: Maybe<PinConnection>
	route: Route
	routes: RouteConnection
	user?: Maybe<User>
	users: UserConnection
	teachers: UserConnection
	students: UserConnection
	currentViewer?: Maybe<LoginSuccess>
	dataLayer?: Maybe<DataLayer>
	dataLayers: DataLayerConnection
}

export type QueryClassroomArgs = {
	input?: Maybe<GetNodeInput>
}

export type QueryClassroomsArgs = {
	input?: Maybe<ClassroomListOptions>
}

export type QueryMapArgs = {
	input: GetMapInput
}

export type QueryMapsArgs = {
	input?: Maybe<MapListOptions>
}

export type QueryPinArgs = {
	input: GetPinInput
}

export type QueryPinsArgs = {
	input?: Maybe<PinListOptions>
}

export type QueryRouteArgs = {
	input: GetRouteInput
}

export type QueryRoutesArgs = {
	input?: Maybe<RouteListOptions>
}

export type QueryUserArgs = {
	input?: Maybe<GetUserInput>
}

export type QueryUsersArgs = {
	input?: Maybe<UsersListOptions>
}

export type QueryTeachersArgs = {
	input?: Maybe<UsersListOptions>
}

export type QueryStudentsArgs = {
	input?: Maybe<UsersListOptions>
}

export type QueryDataLayerArgs = {
	input: GetDataLayerInput
}

export type QueryDataLayersArgs = {
	input?: Maybe<GetDataLayersInput>
}

export type RelationshipOperators = {
	eq?: Maybe<Scalars['String']>
	notEq?: Maybe<Scalars['String']>
}

export interface RequiresReset {
	__typename: 'RequiresReset'
	resetToken: Scalars['String']
	viewer?: Maybe<User>
}

export interface Route extends Node {
	__typename: 'Route'
	uid: Scalars['String']
	title?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	owner: User
	color?: Maybe<Scalars['String']>
	pins?: Maybe<PinConnection>
	maps?: Maybe<MapConnection>
	image?: Maybe<Image>
	imageUrl?: Maybe<Scalars['String']>
	video?: Maybe<Scalars['String']>
}

export interface RouteConnection extends Connection {
	__typename: 'RouteConnection'
	pageInfo: PageInfo
	edges: Array<Maybe<RouteEdge>>
}

export interface RouteEdge extends Edge {
	__typename: 'RouteEdge'
	cursor: Scalars['String']
	node?: Maybe<Route>
}

export type RouteFilterParameter = {
	routeContainsPin?: Maybe<RelationshipOperators>
	routeWithinMap?: Maybe<RelationshipOperators>
}

export type RouteListOptions = {
	first?: Maybe<Scalars['Int']>
	after?: Maybe<Scalars['String']>
	where?: Maybe<RouteFilterParameter>
}

export type SetTemporaryPasswordInput = {
	uid: Scalars['String']
	temporaryPassword: Scalars['String']
}

export enum SortOrder {
	Asc = 'ASC',
	Desc = 'DESC',
}

export type StringOperators = {
	eq?: Maybe<Scalars['String']>
	notEq?: Maybe<Scalars['String']>
	contains?: Maybe<Scalars['String']>
}

export interface Subscription {
	__typename: 'Subscription'
	dummy?: Maybe<Scalars['String']>
	mapUpdated: MapSubscription
	pinAddedToMap: PinSubscription
	pinUpdated: PinSubscription
	pinDeleted: PinSubscription
}

export type SubscriptionMapUpdatedArgs = {
	input: MapUpdatedInput
}

export type SubscriptionPinAddedToMapArgs = {
	input: PinSubscriptionInput
}

export type SubscriptionPinUpdatedArgs = {
	input: PinSubscriptionInput
}

export type SubscriptionPinDeletedArgs = {
	input: PinSubscriptionInput
}

export interface Success {
	__typename: 'Success'
	success: Scalars['Boolean']
	messages: Array<Maybe<Scalars['String']>>
}

export interface Tileset extends Node {
	__typename: 'Tileset'
	uid: Scalars['String']
	baseUri: Scalars['String']
	maxZoom: Scalars['Int']
}

export interface Token {
	__typename: 'Token'
	token: Scalars['String']
	expires: Scalars['String']
}

export type UidInput = {
	uid: Scalars['String']
}

export type UpdateClassroomInput = {
	uid: Scalars['String']
	title?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	addStudents?: Maybe<Array<Maybe<Scalars['String']>>>
	addTeachers?: Maybe<Array<Maybe<Scalars['String']>>>
	addMaps?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type UpdateMapInput = {
	uid: Scalars['String']
	title?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	baseImage?: Maybe<Scalars['Upload']>
	createDataLayer?: Maybe<DataLayerInput>
	associateDataLayer?: Maybe<UidInput>
	removeDataLayer?: Maybe<UidInput>
}

export type UpdatePasswordInput = {
	resetToken: Scalars['String']
	password: Scalars['String']
}

export type UpdatePinInput = {
	uid?: Maybe<Scalars['String']>
	title?: Maybe<Scalars['String']>
	color?: Maybe<Scalars['String']>
	lat?: Maybe<Scalars['Float']>
	lng?: Maybe<Scalars['Float']>
	description?: Maybe<Scalars['String']>
	addToMaps?: Maybe<Array<Maybe<Scalars['String']>>>
	lessonUids?: Maybe<Array<Maybe<Scalars['String']>>>
	addToRoute?: Maybe<AddPinToRouteInput>
	image?: Maybe<Scalars['Upload']>
	video?: Maybe<Scalars['String']>
	imageUrl?: Maybe<Scalars['String']>
}

export type UpdateRouteInput = {
	uid: Scalars['String']
	title?: Maybe<Scalars['String']>
	color?: Maybe<Scalars['String']>
	addPin?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	image?: Maybe<Scalars['Upload']>
	video?: Maybe<Scalars['String']>
	imageUrl?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
	uid: Scalars['String']
	name?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
	addToClassrooms?: Maybe<Array<Scalars['String']>>
	removeFromClassrooms?: Maybe<Array<Scalars['String']>>
}

export interface User extends Node {
	__typename: 'User'
	uid: Scalars['String']
	name: Scalars['String']
	classrooms?: Maybe<ClassroomConnection>
	maps?: Maybe<MapConnection>
	roles?: Maybe<Array<Maybe<Scalars['String']>>>
	pins?: Maybe<PinConnection>
	routes?: Maybe<RouteConnection>
	email?: Maybe<Scalars['String']>
}

export type UserPinsArgs = {
	input?: Maybe<PaginationInput>
}

export type UserRoutesArgs = {
	input?: Maybe<PaginationInput>
}

export interface UserConnection extends Connection {
	__typename: 'UserConnection'
	pageInfo: PageInfo
	edges: Array<Maybe<UserEdge>>
}

export interface UserEdge extends Edge {
	__typename: 'UserEdge'
	cursor: Scalars['String']
	node?: Maybe<User>
}

export type UserFilterParameter = {
	name?: Maybe<StringOperators>
	roles?: Maybe<ListOperators>
	/** User-specific relationship filters */
	userTeachesIn?: Maybe<RelationshipOperators>
	userLearnsIn?: Maybe<RelationshipOperators>
}

export type UsersListOptions = {
	first?: Maybe<Scalars['Int']>
	after?: Maybe<Scalars['String']>
	sort?: Maybe<UserSortParameter>
	where?: Maybe<UserFilterParameter>
}

export type UserSortParameter = {
	name?: Maybe<SortOrder>
}
