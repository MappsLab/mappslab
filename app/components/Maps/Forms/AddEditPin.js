// @flow
import React from 'react'
import { Form, Field } from 'Components/Forms'
import { withCreatePinMutation, withUpdatePinMutation } from 'Queries/pin'
import type { PinType } from 'Types/Pin'
import type { Mutation } from 'Types/GraphQL'

/**
 * AddEditPin
 */

type Props = {
	pin: PinType,
	createPin: Mutation,
	updatePin: Mutation,
	mapUid: string,
	onSuccess: () => void,
}

const AddEditPin = ({ pin, createPin, updatePin, mapUid, onSuccess }: Props) => {
	const handleSubmit = async (values) => {
		const mutate = pin.uid === '__temp__uid__' ? createPin : updatePin
		const variables = {
			...values,
			lat: pin.lat,
			lang: pin.lang,
			addToMaps: [mapUid],
		}
		mutate({ variables }).then(() => {
			onSuccess({ activePinUid: null })
		})
	}
	return (
		<Form onSubmit={handleSubmit} initialValues={pin}>
			<Field label="Title" name="title" />
			<Field label="Description" name="description" />
		</Form>
	)
}

export default withCreatePinMutation(withUpdatePinMutation(AddEditPin))
