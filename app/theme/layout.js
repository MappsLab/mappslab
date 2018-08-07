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
export const boxShadow = css`
	box-shadow: 0px 3px 3px rgba(50, 50, 50, 0.5);
`

export const boxStyles = css`
	background-color: white;
	${radius};
	${boxShadow};
`

export const flexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
`