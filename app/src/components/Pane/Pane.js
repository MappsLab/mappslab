// @flow
// import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	background-color: white;
	${({ theme }) => `
		padding: ${theme.layout.spacing.single};
		${theme.heavyShadow};

	`}
	width: ${({ size }) => {
		switch (size) {
			case 'small':
				return '500px'
			default:
				return '800px'
		}
	}};
`

export default Wrapper
