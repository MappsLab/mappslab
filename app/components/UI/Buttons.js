// @flow
import React from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
import type { IconProps } from 'Components/Icon'

import { buttonStyles } from './styles'

export const ButtonWrapper = styled.button`
	${buttonStyles};
`

type IconButtonProps = {
	onClick: (Event) => void,
}

export const IconButton = (props: IconProps & IconButtonProps) => {
	const { onClick, ...iconProps } = props
	return (
		<button onClick={props.onClick}>
			<Icon {...iconProps} />
		</button>
	)
}

Icon.defaultProps = {
	active: false,
	circle: false,
	noFill: false,
}
type ButtonProps = {
	type?: 'button' | 'submit' | 'reset',
}

export const Button = (props: ButtonProps) => <ButtonWrapper {...props} />

Button.defaultProps = {
	type: 'button',
}

type SubmitButtonProps = {
	disabled: boolean,
}

export const SubmitButton = (props: SubmitButtonProps) => <ButtonWrapper {...props} type="submit" />
