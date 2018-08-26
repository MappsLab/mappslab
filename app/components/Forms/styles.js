// @flow
import { css } from 'styled-components'

import { lightGray, middleGray, red } from 'Styles/colors'
import { spacing } from 'Styles/layout'
import { semi, p, h4 } from 'Styles/text'

/* Forms */

export const formWrapperStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`

export const formMessageStyles = css`
	font-size: ${h4};
`

export const formErrorStyles = css`
	${formMessageStyles} color: ${red};
`

/* Fields */

export const fieldWrapperStyles = css`
	display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	margin: ${({ theme }) => `${theme.spacing.single} 0 ${theme.spacing.double}`};
`

export const labelStyles = css`
	font-weight: ${semi};
	font-size: ${h4};
	text-transform: uppercase;
	margin-bottom: ${spacing.half};
`

export const helpTextStyles = css`
	margin-top: ${spacing.eighth};
	font-size: ${h4};
	color: ${middleGray};
	text-align: left;
`

export const validationErrorStyles = css`
	${helpTextStyles};
	color: ${red};
`

export const inputStyles = css`
	font-size: ${p};
	width: 100%;
	padding: ${spacing.quarter};
	border-bottom: 2px solid;
	border-color: ${(props) => (props.active ? '' : lightGray)};
	transition: 0.3s;
`
