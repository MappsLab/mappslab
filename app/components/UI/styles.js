// @flow
import { css } from 'styled-components'

import { buttonBorder } from 'Styles/ui'
import { flexCenter, spacing } from 'Styles/layout'
import { middleGray, lightGray } from 'Styles/colors'
import { semi, h5 } from 'Styles/type'

export const buttonStyles = css`
	${flexCenter};
	cursor: pointer;
	position: relative;
	margin: ${(props) => (props.secondary ? '0 auto' : `${spacing.single} auto`)};
	width: ${(props) => (props.wide ? '120px' : '80px')};
	height: 30px;
	font-weight: ${semi};
	font-size: ${h5};
	text-transform: uppercase;
	text-align: center;
	border-radius: 0;
	border-width: ${buttonBorder};
	border-style: solid;
	border-color: ${(props) => (props.secondary ? 'transparent' : 'currentColor')};
	color: ${(props) => (props.secondary ? middleGray : 'currentColor')};
	transition: 0.3s;
	${(props) => (props.color ? `color: ${props.color};` : '')};
	${(props) => (props.disabled ? `color: ${lightGray}; pointer-events: none;` : '')};
`
