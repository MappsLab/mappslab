// @flow

import styled from 'styled-components'

const Background = styled.button`
	${({ theme }) => `
		${theme.mixins.fixedFullSize};
	   z-index: ${theme.layout.z.modal - 1};
		background-color: rgba(0, 0, 0, 0.2);
	`};
`

export default Background
