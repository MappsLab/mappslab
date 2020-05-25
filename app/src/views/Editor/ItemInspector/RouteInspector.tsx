import * as React from 'react'
import { EditableText, EditableMedia } from 'Components/Inspector'
import NativeListener from 'react-native-listener'
import { FaPencilAlt } from 'react-icons/fa'
import { Header5 } from '../../../components/Text'
import { Route } from '../../../types-ts'
import { Button } from 'Components/Buttons'
import { useUpdateRouteMutation, UpdateRouteVariables } from '../../../queries'
import { getRouteDistance } from '../../../utils/maps'
import { useCurrentViewer } from '../../../providers/CurrentViewer'

const { useState } = React

interface Props {
	route: Route
	mapUid: string
}

export const RouteInspector = ({ route, mapUid }: Props) => {
	const { viewer } = useCurrentViewer()
	const [editMode, setEditMode] = useState(false)
	const [updateRoute] = useUpdateRouteMutation({ mapUid })
	const enterEdit = () => setEditMode(true)
	const exitEdit = () => setEditMode(false)

	const viewerIsOwner = Boolean(
		viewer && route.owner && route.owner.uid === viewer.uid,
	)
	const canEdit = Boolean(viewerIsOwner && editMode)

	const submitUpdate = async (args: Omit<UpdateRouteVariables, 'uid'>) => {
		if (!viewerIsOwner) throw new Error('You can only update routes you own')

		const variables = {
			uid: route.uid,
			...args,
		}

		updateRoute({
			variables,
		})
	}
	const distance = getRouteDistance(route)

	return (
		<React.Fragment>
			<EditableText
				name="title"
				updateFn={submitUpdate}
				fontSize="h1"
				placeholder="Untitled Route"
				initialValue={route && route.title ? route.title : 'Untitled Route'}
				viewerCanEdit={canEdit}
				autoFocus
			/>
			<EditableText
				name="description"
				updateFn={submitUpdate}
				fontSize="p"
				multiline
				placeholder="Describe your route"
				initialValue={route.description || ''}
				viewerCanEdit={canEdit}
				autoFocus
			/>
			<EditableMedia
				submitUpdate={submitUpdate}
				image={route.image}
				video={route.video}
				viewerCanEdit={canEdit}
			/>
			<Header5 color="darkGray">{distance} miles</Header5>
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
