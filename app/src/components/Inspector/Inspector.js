// @flow
import * as React from 'react'
import styled from 'styled-components'
import Pane from 'Components/Pane'
import { Centered } from 'Components/Layout'
import type { ViewerType } from 'Types'
import { UserInspector, ClassroomInspector, MapInspector } from './Inspectors'
import type { InspectItem, InspectorItem } from './InspectorProvider'
import Breadcrumbs from './Breadcrumbs'

const InspectorInner = styled.div`
	${({ theme }) => `
		min-height: 85vh;
		padding: 0 ${theme.layout.spacing.double};
		width: 100%;
	`}
`

/**
 * Loader
 *
 * Parses the given inspectPath and loads the correct Inspector
 */

type Props = {
	type: string,
	uid: string,
	inspectItem: InspectItem,
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
	viewer: ViewerType,
}

const Loader = (props: Props) => {
	const { type, uid, goBackTo, inspectorHistory, ...inspectorProps } = props
	if (!type || !uid) return null

	const renderInspector = () => {
		switch (type) {
			case 'user':
				return <UserInspector {...inspectorProps} uid={uid} />
			case 'classroom':
				return <ClassroomInspector {...inspectorProps} uid={uid} />
			case 'map':
				return <MapInspector {...inspectorProps} uid={uid} />
			default:
				throw new Error(`There is no inspector for type "${type}"`)
		}
	}
	return (
		<Centered>
			<Pane>
				<Breadcrumbs goBackTo={goBackTo} inspectorHistory={inspectorHistory} />
				<InspectorInner>{renderInspector()}</InspectorInner>
			</Pane>
		</Centered>
	)
}

export default Loader
