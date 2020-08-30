import * as React from 'react'
import styled, { css } from 'styled-components'
import { Button } from '../Buttons'
import { ItemIcon } from '../ItemIcon'
import { useInspector } from './InspectorProvider'
import { getNodeTitle } from '../../utils'

const Wrapper = styled.div`
	${({ theme }) => css`
		position: absolute;
		top: -${theme.layout.spacing.quadruple};
		left: ${theme.layout.spacing.single};
		z-index: 20;
	`}
`

/**
 * Breadcrumbs
 */

export const Breadcrumbs = () => {
	const { goBack, inspectorHistory } = useInspector()
	if (inspectorHistory.length < 2) return null
	const previousItem = inspectorHistory[inspectorHistory.length - 2]

	if (!previousItem) return null

	const title = getNodeTitle(previousItem)

	return (
		<Wrapper>
			<Button onClick={goBack} level="tertiary">
				← <ItemIcon type={previousItem.__typename} /> {title}
			</Button>
		</Wrapper>
	)
}

