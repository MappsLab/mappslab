// @flow
import React from 'react'
import Pin from './Pin'
import { withCreatePinMutation } from '../../../queries/pin'
import type { PinType } from '../../../types'
import AddEditPinForm from '../Forms/AddEditPin'

/**
 * NewPin
 */

type PartialPinType = $Rest<PinType, {| title: string |}>

type Props = {
	newPin: PartialPinType,
	mapUid: string,
	mutate: ({}) => Promise<any>,
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

	handleSubmit = (e) => {
		e.preventDefault()
		const { mapUid } = this.props
		const { title } = this.state
		const { lat, lang } = this.props.newPin
		const newPin = {
			lat,
			lang,
			title,
			addToMap: [mapUid],
		}
		this.props
			.mutate({ variables: newPin })
			.then((response) => {
				const { pin } = response.data
				this.props.onSuccess(pin)
			})
			.catch((err) => {
				console.log('err!')
				console.log(err)
			})
	}

	render() {
		const { newPin } = this.props
		const { title } = this.state
		return (
			<React.Fragment>
				<AddEditPinForm handleSubmit={this.handleSubmit} />
				<Pin {...newPin} title={title} />
			</React.Fragment>
		)
	}
}

export default withCreatePinMutation(NewPin)
