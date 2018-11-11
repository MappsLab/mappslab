// @flow
import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { P } from 'Components/Text'

const pulse = keyframes`
	0% {
		opacity: 0;
	}
	40%, 60% { 
		opacity: 1;
	}
	
`

const Dot = styled.span`
	animation: ${pulse} 1s infinite;
	opacity: 0;
	display: inline;
	${({ delay }) => `
		animation-duration: 1.5s;
		animation-delay: ${(delay - 1) / 3}s;
	`}
`

/**
 * InspectorSkeleton
 */

const InspectorSkeleton = () => (
	<P align="center" color="middlegray">
		<em>
			Loading
			<Dot delay={1}>.</Dot>
			<Dot delay={2}>.</Dot>
			<Dot delay={3}>.</Dot>
		</em>
	</P>
)

export default InspectorSkeleton
