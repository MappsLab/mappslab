// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Centered } from 'Components/Layout'
import type { ViewerType } from 'Types/User'
import Pane from 'Components/Pane'
import { UserInspector, ClassroomInspector, MapInspector } from './Inspectors'
import type { InspectItem, InspectorItem } from './InspectorProvider'
import Breadcrumbs from './Breadcrumbs'

const Outer = styled.div`
	position: relative;
`

/**
 * Loader
 *
 * Parses the given inspectPath and loads the correct Inspector
 */

type Props = {
	// for the Pane
	inspectItem: InspectItem,
	viewer: null | ViewerType,
	// for the breadcrumb
	goBackTo: (InspectorItem) => Promise<void>,
	inspectorHistory: Array<InspectorItem>,
	currentItem: InspectorItem,
}

const Loader = (props: Props) => {
	const { currentItem, goBackTo, inspectorHistory, viewer, inspectItem } = props
	const { __typename, uid, title, name } = currentItem

	const renderInner = () => {
		switch (__typename.toLowerCase()) {
			case 'user':
				return <UserInspector uid={uid} viewer={viewer} inspectItem={inspectItem} />
			case 'classroom':
				return <ClassroomInspector viewer={viewer} uid={uid} paneTitle={title} inspectItem={inspectItem} />
			case 'map':
				return <MapInspector viewer={viewer} uid={uid} paneTitle={title} inspectItem={inspectItem} />
			default:
				throw new Error(`There is no inspector for type "${__typename}"`)
		}
	}

	return (
		<Centered>
			<Outer>
				<Breadcrumbs goBackTo={goBackTo} inspectorHistory={inspectorHistory} />
				<Pane size="full" title={title || name}>
					{renderInner()}
				</Pane>
			</Outer>
		</Centered>
	)
}

export default Loader
