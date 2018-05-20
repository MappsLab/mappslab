// @flow
import React from 'react'
import styled from 'styled-components'

import { buttonStyles } from './styles'

export const ButtonWrapper = styled.button`
	${buttonStyles};
`

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
