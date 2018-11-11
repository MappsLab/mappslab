// @flow
import * as React from 'react'
import styled from 'styled-components'
import Pane from 'Components/Pane'
import { Centered } from 'Components/Layout'
import type { ViewerType } from 'Types'
import { UserQuery, MapQuery, ClassroomQuery } from 'Queries'
import { UserInspector, ClassroomInspector, MapInspector } from './Inspectors'
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
	type: string,
	uid: string,
	inspectItem: InspectItem,
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
	viewer: null | ViewerType,
}

const Loader = (props: Props) => {
	const { type, uid, goBackTo, inspectorHistory, ...inspectorProps } = props
	if (!type || !uid) return null
	const breadcrumbProps = {
		goBackTo,
		inspectorHistory,
	}

	switch (type) {
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
								{loading ? <InspectorSkeleton /> : <UserInspector user={user} {...inspectorProps} />}
							</InspectorPane>
						)
					}}
				</UserQuery>
			)
		case 'classroom':
			return (
				<ClassroomQuery variables={{ uid }} LoadingComponent={false}>
					{({ data, loading }) => {
						const { classroom } = data
						const inspectorPaneProps = loading
							? { title: ' ' }
							: {
									title: classroom.title,
									icon: classroom.emoji || '🎓',
							  }
						return (
							<InspectorPane {...breadcrumbProps} {...inspectorPaneProps}>
								{loading ? <InspectorSkeleton /> : <ClassroomInspector classroom={classroom} {...inspectorProps} />}
							</InspectorPane>
						)
					}}
				</ClassroomQuery>
			)

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
								{loading ? <InspectorSkeleton /> : <MapInspector map={map} {...inspectorProps} />}
							</InspectorPane>
						)
					}}
				</MapQuery>
			)
		// return <MapInspector {...inspectorProps} uid={uid} />
		default:
			throw new Error(`There is no inspector for type "${type}"`)
	}

	// return (
	// 	<Centered>
	// 		<Pane title=>
	// 			<InspectorInner>{renderInspector()}</InspectorInner>
	// 		</Pane>
	// 	</Centered>
	// )
}

export default Loader
