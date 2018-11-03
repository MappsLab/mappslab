// @flow
import React from 'react'
import { State } from 'react-automata'
import NativeListener from 'react-native-listener'
import { Form, Field } from 'Components/Forms'
import { Button } from 'Components/UI'
import { CreatePinMutation, UpdatePinMutation, DeletePinMutation } from 'Queries/Pin'
import type { PinType, NewPinType } from 'Types'
import type { Mutation } from 'Types/GraphQL'
import { states } from '../statechart'

/**
 * RemovePinButton
 */

const RemovePinButton = ({ uid }: { uid: string }) => (
	<DeletePinMutation>
		{(deletePin) => {
			const handleClick = async () => {
				await deletePin({ variables: { uid } })
			}
			return (
				<NativeListener onClick={handleClick}>
					<Button secondary>Delete</Button>
				</NativeListener>
			)
		}}
	</DeletePinMutation>
)

/**
 * AddEditPin
 */

type BaseProps = {
	pin: PinType | NewPinType,
	mapUid: string,
	onSuccess: () => void,
}

type FormProps = BaseProps & {
	mutate: Mutation,
}

const PinForm = ({ pin, mapUid, onSuccess, mutate }: FormProps) => {
	const { lat, lng, uid } = pin
	const handleSubmit = async (values) => {
		const variables = {
			...values,
			lat,
			lng,
			addToMaps: [mapUid],
		}
		mutate({ variables }).then(() => {
			onSuccess()
		})
	}
	return (
		<React.Fragment>
			<Form onSubmit={handleSubmit} initialValues={pin}>
				<Field label="Title" name="title" />
				<Field label="Description" name="description" />
			</Form>
			<State is={states.EDIT_PIN}>
				<RemovePinButton uid={uid} />
			</State>
		</React.Fragment>
	)
}

export const UpdatePinForm = (props: BaseProps) => (
	<UpdatePinMutation>{(updatePin) => <PinForm mutate={updatePin} {...props} />}</UpdatePinMutation>
)

export const CreatePinForm = (props: BaseProps) => (
	<CreatePinMutation>{(createPin) => <PinForm mutate={createPin} {...props} />}</CreatePinMutation>
)
