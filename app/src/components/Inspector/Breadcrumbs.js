// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'Components/Buttons'
import ItemIcon from 'Components/ItemIcon'
import type { InspectorItem } from './InspectorProvider'

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
	console.log(inspectorHistory)
	if (inspectorHistory.length < 2) return null
	const previousItem = inspectorHistory[inspectorHistory.length - 2]

	const goBackToItem = (item: InspectorItem) => () => {
		goBackTo(item)
	}

	return (
		<Wrapper>
			<Button onClick={goBackToItem(previousItem)} level="tertiary">
				← <ItemIcon type={previousItem.__typename} /> {previousItem.title}
			</Button>
		</Wrapper>
	)
}

export default Breadcrumbs
