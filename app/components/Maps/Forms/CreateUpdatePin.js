// @flow
import React from 'react'
import { Form, Field } from 'Components/Forms'
import { CreatePinMutation, UpdatePinMutation } from 'Queries/pin'
import type { PinType, NewPinType } from 'Types'
import type { Mutation } from 'Types/GraphQL'

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
	const handleSubmit = async (values) => {
		const { lat, lng } = pin
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
		<Form onSubmit={handleSubmit} initialValues={pin}>
			<Field label="Title" name="title" />
			<Field label="Description" name="description" />
		</Form>
	)
}

export const UpdatePinForm = (props: BaseProps) => (
	<UpdatePinMutation>{(updatePin) => <PinForm mutate={updatePin} {...props} />}</UpdatePinMutation>
)

export const CreatePinForm = (props: BaseProps) => (
	<CreatePinMutation>{(createPin) => <PinForm mutate={createPin} {...props} />}</CreatePinMutation>
)
