// @flow
import * as React from 'react'
import { EditableText, EditableMedia } from 'Components/Inspector'
import NativeListener from 'react-native-listener'
import { Route, Viewer, Mutation } from 'Types'
import { FaPencilAlt } from 'react-icons/fa'
import { Button } from 'Components/Buttons'
import { UpdateRouteMutation } from 'Queries/Route'
import { query as mapQuery } from 'Queries/Map/MapQuery'

const { useState } = React

type BaseProps = {
	route: Route
	mapUid: string
	viewer?: Viewer
}

type Props = BaseProps & {
	updateRoute: Mutation
}

const RouteInspector = ({ route, viewer, updateRoute, mapUid }: Props) => {
	const [editMode, setEditMode] = useState(false)
	const enterEdit = () => setEditMode(true)
	const exitEdit = () => setEditMode(false)

	const viewerIsOwner = Boolean(viewer && route.owner && route.owner.uid === viewer.uid)
	const canEdit = Boolean(viewerIsOwner && editMode)

	const submitUpdate = async (args) => {
		if (!viewerIsOwner) throw new Error('You can only update routes you own')

		const variables = {
			uid: route.uid,
			...args,
		}

		updateRoute({ variables, refetchQueries: [{ query: mapQuery, variables: { uid: mapUid } }] })
	}

	return (
		<React.Fragment>
			<EditableText
				name="title"
				label="Title"
				updateFn={submitUpdate}
				fontSize="h1"
				placeholder="Untitled Route"
				initialValue={route && route.title ? route.title : 'Untitled Route'}
				viewerCanEdit={canEdit}
				autoFocus
			/>
			<EditableText
				name="description"
				label="Description"
				updateFn={submitUpdate}
				fontSize="p"
				multiline
				placeholder="Describe your route"
				initialValue={route.description}
				viewerCanEdit={canEdit}
				autoFocus
			/>
			<EditableMedia submitUpdate={submitUpdate} image={route.image} video={route.video} viewerCanEdit={canEdit} />
			{viewerIsOwner && canEdit === false ? (
				<NativeListener onClick={enterEdit}>
					<Button level="tertiary">
						<FaPencilAlt /> Edit
					</Button>
				</NativeListener>
			) : canEdit ? (
				<React.Fragment>
					<NativeListener onClick={exitEdit}>
						<Button level="tertiary">
							<FaPencilAlt /> Done Editing
						</Button>
					</NativeListener>
				</React.Fragment>
			) : null}
		</React.Fragment>
	)
}

RouteInspector.defaultProps = {
	viewer: undefined,
}

const RouteInspectorWrapper = (baseProps: BaseProps) => (
	<UpdateRouteMutation>{(updateRoute) => <RouteInspector {...baseProps} updateRoute={updateRoute} />}</UpdateRouteMutation>
)

export default RouteInspectorWrapper
