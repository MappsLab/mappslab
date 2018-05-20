// @flow
import { css } from 'styled-components'

import { flexCenter, spacing } from 'App/styles/layout'
import { middleGray, lightGray } from 'App/styles/colors'
import { semi, h5 } from 'App/styles/type'

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
	border-width: 2px;
	border-style: solid;
	border-color: ${(props) => (props.secondary ? 'transparent' : 'currentColor')};
	color: ${(props) => (props.secondary ? middleGray : 'currentColor')};
	transition: 0.3s;
	${(props) => (props.color ? `color: ${props.color};` : '')};
	${(props) => (props.disabled ? `color: ${lightGray}; pointer-events: none;` : '')};
`
