// @flow
import { css } from 'styled-components'

import { flexCenter, spacing } from 'Styles/layout'
import { middleGray, lightGray } from 'Styles/colors'
import { semi, h5 } from 'Styles/text'

export const buttonStyles = css`
	${flexCenter};
	cursor: pointer;
	position: relative;
	margin: ${({ theme, secondary }) => (secondary ? '0 auto' : `${theme.layout.spacing.single} auto`)};
	width: auto;
	height: 30px;
	font-weight: ${semi};
	font-size: ${h5};
	text-transform: uppercase;
	text-align: center;
	border-radius: 0;
	border-width: 1px;
	border-radius: 4px;
	padding: 0 ${({ theme }) => theme.layout.spacing.single};
	border-style: solid;
	border-color: ${(props) => (props.secondary ? 'transparent' : 'currentColor')};
	color: ${(props) => (props.secondary ? middleGray : 'currentColor')};
	transition: 0.3s;
	${(props) => (props.color ? `color: ${props.color};` : '')};
	${(props) => (props.disabled ? `color: ${lightGray}; pointer-events: none;` : '')};
`
