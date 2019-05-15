import { css } from 'styled-components'

export const flexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
`

export const fixedFullSize = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

export const absFullSize = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

export const boxShadow = {
	normal: '0 1px 2px rgba(0, 0, 0, 0.5);',
	heavy: '0 2px 2px rgba(0, 0, 0, 0.5);',
}

export const borderRadius = '2px'
