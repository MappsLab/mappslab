import * as React from 'react'
import styled, { DefaultTheme, css, keyframes } from 'styled-components'
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

interface MessageProps {
  theme: DefaultTheme,
  visible?: boolean

}

const Message = styled(Header4)`
	${({ theme, visible }: MessageProps) => css`
		transition: 0.3s;
		animation: ${visible
			? css`0.5s ${enter} 1 forwards`
			: css`0.5s ${hide} 1 forwards`};
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

type Timeout = ReturnType<typeof setTimeout>

type Props = NotificationType

type State = {
	visible: boolean,
}

export class Notification extends React.Component<Props, State> {
	state = {
		visible: true,
	}

	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.setState({ visible: false })
		}, 5000)
	}

	timeout:Timeout 

	render() {
		const { visible } = this.state
		const { message } = this.props
		return <Message visible={visible}>{message}</Message>
	}
}

