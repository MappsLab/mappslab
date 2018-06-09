// @flow

import { css } from 'styled-components'

import { padding } from './spacing'
import { radius, gray, lightGray, boxShadow } from './theme'

export const chipStyles = css`
	border: 1px solid ${gray};
	background-color: ${lightGray};
	${radius};
	${boxShadow};
	padding: ${padding};
`
