// @flow
import React from 'react'
import styled from 'styled-components'
import type { NewPinType } from 'Types'

const Label = styled.label`
	font-size: 18px;
	display: block;
`

const Input = styled.input`
	font-size: 16px;
	border: 1px solid black;
	padding: 3px 5px;
	margin: 10px 0;
`

const Textarea = styled.textarea`
	font-size: 16px;
	border: 1px solid black;
	padding: 3px 5px;
	margin: 10px 0;
`

const Button = styled.button`
	display: block;
	margin: 0 auto;
	border: 2px solid gray;
	border-radius: 2px;
	font-size: 12px;
	padding: 4px;
`

const FormContainer = styled.div`
	border: 1px solid gray;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
	border-radius: 2px;
	position: absolute;
	width: 400px;
	bottom: 120px;
	left: calc(50% - 200px);
	background: white;
	z-index: 110;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

/**
 * AddEditPin
 */

type Props = {
	handleSubmit: ({}) => void,
	pin: NewPinType,
}

const AddEditPin = ({ handleSubmit, pin }: Props) => {
	const { title, description } = pin
	return (
		<FormContainer>
			<form onSubmit={handleSubmit}>
				<Label>What's this pin called?</Label>
				<Input type="text" id="title" name="title" value={title} />
				<Textarea id="description" name="description" value={description || ''} />
				<Button type="submit">submit</Button>
			</form>
		</FormContainer>
	)
}

export default AddEditPin
