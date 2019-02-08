// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'Components/Buttons'
import type { InspectorItem } from './InspectorProvider'
import ItemIcon from 'Components/ItemIcon'

const Wrapper = styled.div`
	${({ theme }) => `
	
		position: absolute;
		top: -${theme.layout.spacing.quadruple};
		left: ${theme.layout.spacing.single};
		z-index: 20;
	`}
`

/**
 * Breadcrumbs
 */

type Props = {
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
}

const Breadcrumbs = (props: Props) => {
	const { goBackTo, inspectorHistory } = props
	if (inspectorHistory.length < 2) return null
	const previousItem = inspectorHistory[inspectorHistory.length - 2]

	const goBackToItem = (item: InspectorItem) => () => {
		goBackTo(item)
	}

	return (
		<Wrapper>
			<Button onClick={goBackToItem(previousItem)} level="tertiary">
				← <ItemIcon type={previousItem.type} /> {previousItem.title}
			</Button>
		</Wrapper>
	)
}

export default Breadcrumbs
