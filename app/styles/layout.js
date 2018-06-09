// @flow
import { css } from 'styled-components'

export const headerHeight = '42px'
export const footerHeight = '60px'

export const flexCenter = `
	display: flex;
	justify-content: center;
	align-items: center;
`

export const z = {
	titleBar: 50,
	settingsMenu: 80,
	overlay: 100,
	modal: 120,
	alert: 150,
}

export const fixedFullSize = `
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

export const absFullSize = `
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

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
export const boxShadow = css`
	box-shadow: 0px 3px 3px rgba(50, 50, 50, 0.5);
`

export const boxStyles = css`
	background-color: white;
	${radius};
	${boxShadow};
`
