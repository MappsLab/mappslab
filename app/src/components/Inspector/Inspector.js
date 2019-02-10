// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Centered } from 'Components/Layout'
import type { ViewerType } from 'Types'
import { MapQuery } from 'Queries'
import Pane from 'Components/Pane'
import { UserInspector, ClassroomInspector, MapInspector, AdminInspector } from './Inspectors'
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
	__typename: string,
	uid?: string,
	title?: string,
	inspectItem: InspectItem,
	viewer: null | ViewerType,
	// for the breadcrumb
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
}

const Loader = (props: Props) => {
	const { __typename, uid, title, goBackTo, inspectorHistory, viewer, inspectItem } = props
	if (!__typename) return null

	const renderInner = () => {
		switch (__typename.toLowerCase()) {
			case 'admin':
				if (!viewer) return <p>You must be logged in</p>
				return <AdminInspector viewer={viewer} inspectItem={inspectItem} />
			case 'user':
				return <UserInspector uid={uid} viewer={viewer} inspectItem={inspectItem} />
			case 'classroom':
				return <ClassroomInspector viewer={viewer} uid={uid} paneTitle={title} inspectItem={inspectItem} />

			case 'map':
				return null
			// return (
			// 	<MapQuery variables={{ uid }} LoadingComponent={false}>
			// 		{({ data, loading }) => {
			// 			const { map } = data
			// 			const inspectorPaneProps = loading
			// 				? { title: ' ' }
			// 				: {
			// 						title: map.title,
			// 						icon: map.emoji || '🗺',
			// 				  }
			// 			return (
			// 				<InspectorPane {...breadcrumbProps} {...inspectorPaneProps}>
			// 					{loading ? <InspectorSkeleton /> : <MapInspector viewer={viewer} map={map} inspectItem={inspectItem} />}
			// 				</InspectorPane>
			// 			)
			// 		}}
			// 	</MapQuery>
			// )
			default:
				throw new Error(`There is no inspector for type "${__typename}"`)
		}
	}

	return (
		<Centered>
			<Outer>
				<Breadcrumbs goBackTo={goBackTo} inspectorHistory={inspectorHistory} />
				<Pane size="full" title={title}>
					{renderInner()}
				</Pane>
			</Outer>
		</Centered>
	)
}

Loader.defaultProps = {
	uid: undefined,
	title: undefined,
}

export default Loader
