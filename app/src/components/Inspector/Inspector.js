// @flow
import * as React from 'react'
import styled from 'styled-components'
import Pane from 'Components/Pane'
import { Centered } from 'Components/Layout'
import type { ViewerType } from 'Types'
import { UserQuery, MapQuery, ClassroomQuery, UpdateClassroomMutation } from 'Queries'
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
	// for the Pane
	type: string,
	uid: string,
	title: string,
	inspectItem: InspectItem,
	viewer: null | ViewerType,
	// for the breadcrumb
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
}

const Loader = (props: Props) => {
	const { type, uid, title, goBackTo, inspectorHistory, viewer, inspectItem } = props
	if (!type || !uid) return null
	const breadcrumbProps = {
		goBackTo,
		inspectorHistory,
	}

	const renderInner = () => {
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
									{loading ? <InspectorSkeleton /> : <UserInspector viewer={viewer} user={user} inspectItem={inspectItem} />}
								</InspectorPane>
							)
						}}
					</UserQuery>
				)
			case 'classroom':
				return <ClassroomInspector viewer={viewer} uid={uid} paneTitle={title} inspectItem={inspectItem} />
			// return <ClassroomInspector viewer={viewer} uid={uid} inspectItem={inspectItem} />
			// <UpdateClassroomMutation>
			// 	{(updateClassroom) => (
			// 		<ClassroomQuery variables={{ uid }} LoadingComponent={false}>
			// 			{({ data, loading }) => {
			// 				const { classroom } = data

			// 				const updateTitle = async ({ title }) => {
			// 					const variables = {
			// 						uid: classroom.uid,
			// 						title,
			// 					}
			// 					await updateClassroom({ variables })
			// 				}
			// 				const teacherUids = classroom.teachers.map((t) => t.uid)
			// 				const viewerCanEdit = Boolean(viewer && teacherUids.includes(viewer.uid))

			// 				const inspectorPaneProps = loading
			// 					? { title: ' ' }
			// 					: {
			// 							title: classroom.title,
			// 							icon: classroom.emoji || '🎓',
			// 							titleUpdateFn: viewerCanEdit ? updateTitle : undefined,
			// 							viewerCanEdit,
			// 					  }

			// 				return (
			// 					<InspectorPane {...breadcrumbProps} {...inspectorPaneProps}>
			// 						{loading ? (
			// 							<InspectorSkeleton />
			// 						) : (
			// 							<ClassroomInspector viewer={viewer} classroom={classroom} {...inspectorProps} />
			// 						)}
			// 					</InspectorPane>
			// 				)
			// 			}}
			// 		</ClassroomQuery>
			// 	)}
			// </UpdateClassroomMutation>

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

	// return (
	// 	<Centered>
	// 		<Pane title=>
	// 			<InspectorInner>{renderInspector()}</InspectorInner>
	// 		</Pane>
	// 	</Centered>
	// )
}

export default Loader
