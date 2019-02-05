// @flow
import * as React from 'react'
import styled from 'styled-components'
import Pane from 'Components/Pane'
import { Centered } from 'Components/Layout'
import type { ViewerType } from 'Types'
import { UserQuery, MapQuery } from 'Queries'
import { UserInspector, ClassroomInspector, MapInspector, AdminInspector } from './Inspectors'
import type { InspectItem, InspectorItem } from './InspectorProvider'
import Breadcrumbs from './Breadcrumbs'
import InspectorSkeleton from './InspectorSkeleton'

const Outer = styled.div`
	position: relative;
`

type PaneProps = {
	children: React.Node,
	title: string,
	subtitle?: string,
	icon: string,
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
}

const InspectorPane = ({ children, goBackTo, inspectorHistory, ...paneProps }: PaneProps) => (
	<Centered>
		<Outer>
			<Breadcrumbs goBackTo={goBackTo} inspectorHistory={inspectorHistory} />
			<Pane size="full" {...paneProps}>
				{children}
			</Pane>
		</Outer>
	</Centered>
)

InspectorPane.defaultProps = {
	subtitle: undefined,
}

/**
 * Loader
 *
 * Parses the given inspectPath and loads the correct Inspector
 */

type Props = {
	// for the Pane
	type: string,
	uid?: string,
	title?: string,
	inspectItem: InspectItem,
	viewer: null | ViewerType,
	// for the breadcrumb
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
}

const Loader = (props: Props) => {
	const { type, uid, title, goBackTo, inspectorHistory, viewer, inspectItem } = props
	if (!type) return null
	const breadcrumbProps = {
		goBackTo,
		inspectorHistory,
	}

	const renderInner = () => {
		switch (type) {
			case 'admin':
				return <AdminInspector viewer={viewer} inspectItem={inspectItem} />
			case 'user':
				return (
					<UserQuery variables={{ uid }} LoadingComponent={false}>
						{({ data, loading }) => {
							const { user } = data
							const inspectorPaneProps = loading
								? { title: ' ' }
								: {
										title: user.name,
										icon: user.emoji || '👤',
										subtitle: user.roles.includes('admin') ? 'admin' : user.roles.includes('teacher') ? 'teacher' : 'student',
								  }
							return (
								<InspectorPane {...breadcrumbProps} {...inspectorPaneProps}>
									{loading ? <InspectorSkeleton /> : <UserInspector viewer={viewer} user={user} inspectItem={inspectItem} />}
								</InspectorPane>
							)
						}}
					</UserQuery>
				)
			case 'classroom':
				return <ClassroomInspector viewer={viewer} uid={uid} paneTitle={title} inspectItem={inspectItem} />

			case 'map':
				return (
					<MapQuery variables={{ uid }} LoadingComponent={false}>
						{({ data, loading }) => {
							const { map } = data
							const inspectorPaneProps = loading
								? { title: ' ' }
								: {
										title: map.title,
										icon: map.emoji || '🗺',
								  }
							return (
								<InspectorPane {...breadcrumbProps} {...inspectorPaneProps}>
									{loading ? <InspectorSkeleton /> : <MapInspector viewer={viewer} map={map} inspectItem={inspectItem} />}
								</InspectorPane>
							)
						}}
					</MapQuery>
				)
			// return <MapInspector {...inspectorProps} uid={uid} />
			default:
				throw new Error(`There is no inspector for type "${type}"`)
		}
	}

	return (
		<Centered>
			<Outer>
				<Breadcrumbs goBackTo={goBackTo} inspectorHistory={inspectorHistory} />

				{renderInner()}
			</Outer>
		</Centered>
	)
}

Loader.defaultProps = {
	uid: undefined,
	title: undefined,
}

export default Loader
