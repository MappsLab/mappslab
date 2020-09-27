import * as React from 'react'
import NativeListener from 'react-native-listener'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { useQuestion } from '../../../components/Question'
import { Pin } from '../../../types-ts'
import {
	EditableText,
	EditableMedia,
	linkifyDecorator,
} from '../../../components/Inspector'
import { Button } from '../../../components/Buttons'
import { useCurrentViewer } from '../../../providers/CurrentViewer'
import {
	useUpdatePinMutation,
	UpdatePinVariables,
	useDeletePinMutation,
} from '../../../queries'
import { useInspector } from './Provider'
import { useGoogleMap } from '@react-google-maps/api'

const { useState } = React

interface Props {
	pin: Pin
	mapUid: string
}

export const PinInspector = ({ pin, mapUid }: Props) => {
	const googleMap = useGoogleMap()
	const { viewer } = useCurrentViewer()
	const [updatePin] = useUpdatePinMutation({ mapUid })
	const [deletePin] = useDeletePinMutation()
	const { closeInspector } = useInspector()
	const { ask } = useQuestion()
	const [editMode, setEditMode] = useState(false)

	const viewerIsOwner = Boolean(
		viewer && pin.owner && pin.owner.uid === viewer.uid,
	)
	const canEdit = Boolean(viewerIsOwner && editMode)

	const enterEdit = () => setEditMode(true)
	const exitEdit = () => setEditMode(false)

	const submitUpdate = async (args: Omit<UpdatePinVariables, 'uid'>) => {
		if (!viewerIsOwner) throw new Error('You can only update pins you own')
		const variables = {
			uid: pin.uid,
			...args,
		}

		updatePin({
			variables,
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
		})

		closeInspector()
	}

	return (
		<React.Fragment key={pin.uid}>
			{linkifyDecorator(
				`http://www.google.com/maps/place/${pin.lat},${pin.lng}/@${pin.lat},${pin.lng},${googleMap?.getZoom()}z`,
				'Open in Google Maps',
				'pin-map-link',
			)}
			<EditableText
				name="title"
				updateFn={submitUpdate}
				fontSize="h1"
				placeholder="Untitled Pin"
				initialValue={pin.title || 'Untitled Pin'}
				viewerCanEdit={canEdit}
				autoFocus
			/>
			<EditableText
				name="description"
				updateFn={submitUpdate}
				multiline
				placeholder="Describe your pin"
				fontSize="p"
				initialValue={pin.description || ''}
				viewerCanEdit={canEdit}
			/>
			<EditableMedia
				submitUpdate={submitUpdate}
				image={pin.image}
				video={pin.video}
				imageUrl={pin.imageUrl}
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
