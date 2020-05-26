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

export const Inspector = () => {
	const { currentItem } = useInspector()
	if (!currentItem) return null
	const title = getNodeTitle(currentItem)

	const renderInner = () => {
		switch (currentItem.__typename) {
			case 'User':
				return <UserInspector userUid={currentItem.uid} />
			case 'Classroom':
				return <ClassroomInspector classroomUid={currentItem.uid} />
			case 'Map':
				return <MapInspector mapUid={currentItem.uid} />
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

