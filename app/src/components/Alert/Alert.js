// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import Pane from 'Components/Pane'
import { Button } from 'Components/Buttons'
import type { PromisedAlertConfig } from './AlertProvider'

const Background = styled.div`
	${({ theme }) => css`
		z-index: ${theme.layout.z.alert};
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.15);
	`}
`

/**
 * Alert
 */

type AlertProps = {
	visible: boolean,
	alert?: PromisedAlertConfig,
}
const defaultButtons = [
	{
		label: 'OK',
		level: 'primary',
		returnValue: true,
	},
]

const Alert = ({ visible, alert }: AlertProps) => {
	if (!visible || !alert) return null
	const { title, message, buttons } = alert
	console.log(alert)
	const alertButtons = buttons || defaultButtons
	return (
		<Background data-testid="alert">
			<Pane size="small" title={title}>
				<p>{message}</p>
				{alertButtons.map(({ label, ...buttonConfig }) => (
					<Button key={label} {...buttonConfig}>
						{label}
					</Button>
				))}
			</Pane>
		</Background>
	)
}

Alert.defaultProps = {
	alert: undefined,
}

export default Alert
