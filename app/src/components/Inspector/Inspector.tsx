import * as React from 'react'
import styled from 'styled-components'
import { Centered } from '../../components/Layout'
import { Pane } from '../../components/Pane'
import { UserInspector, ClassroomInspector, MapInspector } from './Inspectors'
import { useInspector } from './InspectorProvider'
import { Breadcrumbs } from './Breadcrumbs'
import { getNodeTitle } from '../../utils'

const Outer = styled.div`
	position: relative;
`

/**
 * Loader
 *
 * Parses the given inspectPath and loads the correct Inspector
 */

const Loader = () => {
	const { currentItem } = useInspector()
	if (!currentItem) return null
	const title = getNodeTitle(currentItem)

	const renderInner = () => {
		switch (currentItem.__typename) {
			case 'User':
				return <UserInspector user={currentItem} />
			case 'Classroom':
				return <ClassroomInspector classroom={currentItem} />
			case 'Map':
				return <MapInspector map={currentItem} />
			default:
				throw new Error(
					`There is no inspector for type "${currentItem.__typename}"`,
				)
		}
	}

	return (
		<Centered>
			<Outer>
				<Breadcrumbs />
				<Pane size="full" title={title}>
					{renderInner()}
				</Pane>
			</Outer>
		</Centered>
	)
}

export default Loader
