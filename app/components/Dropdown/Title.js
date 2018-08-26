// @flow
import React from 'react'
import styled from 'styled-components'
import { Header3 } from 'Components/Text'

const Wrapper = styled.div`
	position: relative;
	padding: ${({ theme }) => theme.spacing.half};
`

/**
 * Title
 */

type Props = {
	label: string,
	toggleMenu: () => void,
}

const Title = ({ label, toggleMenu }: Props) => (
	<Wrapper>
		<Header3 color="gray" align="center">
			<button type="button" onClick={toggleMenu}>
				{label} ▾
			</button>
		</Header3>
	</Wrapper>
)

export default Title
