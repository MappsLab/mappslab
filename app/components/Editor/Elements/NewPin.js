// @flow
import React from 'react'
import styled from 'styled-components'
import Pin from './Pin'
import { withCreatePinMutation } from '../../../queries/pin'
import type { PinType } from '../../../types/'

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
 * NewPin
 */

type PartialPinType = $Rest<PinType, {| title: string |}>

type Props = {
	newPin: PartialPinType,
	mapUid: string,
	mutate: ({}) => Promise<any | Error>,
	onSuccess: (PinType) => void,
}

type State = {
	title: string,
}

class NewPin extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	state = {
		title: '',
	}

	updateValue = (name: string) => (e) => {
		const { value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { mapUid } = this.props
		const { title } = this.state
		const { lat, lang } = this.props.newPin
		const newPin = {
			lat,
			lang,
			title,
			mapUids: [mapUid],
		}
		this.props
			.mutate({ variables: newPin })
			.then((response) => {
				const { pin } = response
				this.props.onSuccess(pin)
				console.log(response)
			})
			.catch((err) => {
				console.log('err!')
				console.log(err)
			})
	}

	render() {
		console.log(this.props)
		const { newPin } = this.props
		const { title } = this.state
		return (
			<React.Fragment>
				<FormContainer>
					<form onSubmit={this.handleSubmit}>
						<Label>What's this pin called?</Label>
						<Input type="text" id="title" name="title" value={title} onChange={this.updateValue('title')} />
						<Button type="submit">submit</Button>
					</form>
				</FormContainer>
				<Pin {...newPin} title={title} />
			</React.Fragment>
		)
	}
}

export default withCreatePinMutation(NewPin)
