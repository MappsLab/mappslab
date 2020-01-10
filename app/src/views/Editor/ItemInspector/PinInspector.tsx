import * as React from 'react'
import NativeListener from 'react-native-listener'
import { useQuestion } from 'Components/Question'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { Viewer, Pin, Mutation } from '../../../types'
import { EditableText, EditableMedia } from 'Components/Inspector'
import { Button } from 'Components/Buttons'
import { UpdatePinMutation, DeletePinMutation } from 'Queries/Pin'
import { query as mapQuery } from 'Queries/Map/MapQuery'
import { useInspector } from './Provider'

const { useState } = React

interface BaseProps {
	pin: Pin
	mapUid: string
	viewer?: Viewer
}

type Props = BaseProps & {
	updatePin: Mutation
	deletePin: Mutation
}

const PinInspector = ({ pin, viewer, updatePin, deletePin, mapUid }: Props) => {
	const { closeInspector } = useInspector()
	const { ask } = useQuestion()
	const [editMode, setEditMode] = useState(false)

	const viewerIsOwner = Boolean(
		viewer && pin.owner && pin.owner.uid === viewer.uid,
	)
	const canEdit = Boolean(viewerIsOwner && editMode)

	const enterEdit = () => setEditMode(true)
	const exitEdit = () => setEditMode(false)

	const submitUpdate = async (args) => {
		// @todo add a 'viewerOwnsPin' field to the GraphQL API
		if (!viewerIsOwner) throw new Error('You can only update pins you own')
		const variables = {
			uid: pin.uid,
			...args,
		}

		updatePin({
			variables,
			refetchQueries: [{ query: mapQuery, variables: { uid: mapUid } }],
		})
	}

	const removePin = async () => {
		const answer = await ask({
			message: 'Are you sure you want to remove this pin?',
			options: [
				{ title: 'Yes', level: 'primary', returnValue: true },
				{ title: 'Cancel', level: 'secondary', returnValue: false },
			],
		})

		if (answer === false) return
		await deletePin({
			variables: { uid: pin.uid },
			refetchQueries: [{ query: mapQuery, variables: { uid: mapUid } }],
		})

		closeInspector()
	}

	return (
		<React.Fragment>
			<EditableText
				name="title"
				label="Title"
				updateFn={submitUpdate}
				fontSize="h1"
				placeholder="Untitled Pin"
				initialValue={pin.title || 'Untitled Pin'}
				viewerCanEdit={canEdit}
				autoFocus
			/>
			<EditableText
				label="Description"
				name="description"
				updateFn={submitUpdate}
				multiline
				placeholder="Describe your pin"
				fontSize="p"
				initialValue={pin.description}
				viewerCanEdit={canEdit}
			/>
			<EditableMedia
				submitUpdate={submitUpdate}
				image={pin.image}
				video={pin.video}
				viewerCanEdit={canEdit}
			/>
			{viewerIsOwner && canEdit === false ? (
				<NativeListener onClick={enterEdit}>
					<Button level="tertiary">
						<FaPencilAlt /> Edit
					</Button>
				</NativeListener>
			) : canEdit ? (
				<React.Fragment>
					<NativeListener onClick={removePin}>
						<Button level="tertiary">
							<FaTrashAlt /> Delete
						</Button>
					</NativeListener>
					<hr />
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

PinInspector.defaultProps = {
	viewer: undefined,
}

const PinInspectorWrapper = (baseProps: BaseProps) => (
	<UpdatePinMutation>
		{(updatePin) => (
			<DeletePinMutation>
				{(deletePin) => (
					<PinInspector
						{...baseProps}
						deletePin={deletePin}
						updatePin={updatePin}
					/>
				)}
			</DeletePinMutation>
		)}
	</UpdatePinMutation>
)

export default PinInspectorWrapper
