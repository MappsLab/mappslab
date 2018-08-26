// @flow
import { css } from 'styled-components'

export const z = {
	titleBar: 50,
	settingsMenu: 80,
	overlay: 100,
	modal: 120,
	alert: 150,
}

export const spacing = {
	eighth: '2px',
	quarter: '4px',
	half: '7px',
	single: '14px',
	double: '24px',
	triple: '36px',
	quadruple: '48px',
}

export const radius = css`
	border-radius: 7px;
`

export const heavyShadow = css`
	box-shadow: 0px 2px 5px 1px rgba(50, 50, 50, 0.5);
`

export const lightShadow = css`
	box-shadow: 0px 2px 3px 0px rgba(50, 50, 50, 0.5);
`

export const flexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
`
