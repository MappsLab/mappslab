// @flow
import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Header4 } from 'Components/Text'
import type { NotificationType } from './Context'

const hide = keyframes`
	0% {
		opacity: 1
	},
	99% {
		display: block;
	}
	100% {
		opacity: 0;
		display: none;
	}
`

const enter = keyframes`
	0% {
		opacity: 0;
		height: 0;
		transform: rotateX(90deg);
	},
	100% {
		opacity: 1;
		height: 30px;
		transform: none;
	}
`

const Message = styled(Header4)`
	${({ theme, visible }) => css`
		transition: 0.3s;
		pointer-events: initial;
		animation: ${visible ? css`0.5s ${enter} 1 forwards` : css`0.5s ${hide} 1 forwards`};
		background-color: white;
		transform-origin: 50% 100%;
		height: 30px;
		padding: 0 ${theme.layout.spacing.single};
		display: flex;
		align-items: center;
		margin: ${theme.layout.spacing.half} 0;
		border-radius: ${theme.mixins.borderRadius};
		box-shadow: ${theme.mixins.boxShadow.normal};
	`}
`

/**
 * Notification
 */

type Props = NotificationType

type State = {
	visible: boolean,
}

class Notification extends React.Component<Props, State> {
	state = {
		visible: true,
	}

	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.setState({ visible: false })
		}, 5000)
	}

	timeout: TimeoutID

	render() {
		const { visible } = this.state
		const { message } = this.props
		return <Message visible={visible}>{message}</Message>
	}
}

export default Notification
