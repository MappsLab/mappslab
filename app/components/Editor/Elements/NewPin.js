// @flow
import React from 'react'
import styled from 'styled-components'
import Pin from './Pin'
import type { PinType } from '../../../types/'

const Label = styled.label`
	font-size: 18px;
	display: block;
`

const Input = styled.input`
	font-size: 16px;
	border: 1px solid black;
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

type Props = {
	pin: PinType,
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
		const val = e.target.value
		console.log(val)
		// this.setState({ [name]: })
	}

	handleSubmit = (e) => {
		e.preventDefault()
	}

	render() {
		const { pin } = this.props
		const { title } = this.state
		return (
			<React.Fragment>
				<FormContainer>
					<form onSubmit={this.handleSubmit}>
						<Label>What's this pin called?</Label>
						<Input type="text" id="title" name="title" onChange={this.updateValue('title')} />
						<Button type="submit">submit</Button>
					</form>
				</FormContainer>
				<Pin {...pin} title={title} />
			</React.Fragment>
		)
	}
}

export default NewPin
