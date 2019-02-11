// @flow
import * as React from 'react'
import type { ViewerType, ClassroomType } from 'Types'
import type { Mutation, QueryConfig } from 'Types/GraphQL'
import { UpdateClassroomMutation, ClassroomQuery } from 'Queries/Classroom'
import { MapList, UserList } from 'Components/Lists'
import type { InspectItem } from '../InspectorProvider'
import InspectorSkeleton from '../InspectorSkeleton'

/**
 * ClassroomInspector
 */

type BaseProps = {
	inspectItem: InspectItem,
	viewer: ViewerType | null,
}

type Props = BaseProps & {
	classroom: ClassroomType,
	classroomQueryConfig: QueryConfig,
	updateClassroom: Mutation,
}

const ClassroomInspector = ({ viewer, classroom, updateClassroom, inspectItem, classroomQueryConfig }: Props) => {
	const updateClassroomUsers = (user) => {
		const addKey = user.roles.includes('teacher') ? 'addTeachers' : 'addStudents'
		const variables = {
			input: {
				uid: classroom.uid,
				[addKey]: [user.uid],
			},
		}
		updateClassroom({ variables, refetchQueries: [classroomQueryConfig] })
	}

	const updateClassroomMaps = (map) => {
		const variables = {
			input: {
				uid: classroom.uid,
				addMaps: [map.uid],
			},
		}
		updateClassroom({ variables, refetchQueries: [classroomQueryConfig] })
	}

	const viewerCanAdd = Boolean(
		viewer &&
			(viewer.roles.includes('admin') ||
				(viewer.roles.includes('teacher') || classroom.teachers.map((t) => t.uid).includes(viewer.uid))),
	)

	return (
		<React.Fragment>
			<MapList
				title="Maps in this Classroom"
				items={classroom.maps || []}
				viewer={viewer}
				update={updateClassroomMaps}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
			/>
			<UserList
				title="Students in this Classroom"
				items={classroom.students || []}
				viewer={viewer}
				update={updateClassroomUsers}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
			/>
			<UserList
				title="Teachers in this Classroom"
				items={classroom.teachers || []}
				viewer={viewer}
				update={updateClassroomUsers}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
			/>
		</React.Fragment>
	)
}

const Wrapper = ({ uid, ...baseProps }: BaseProps & { uid: string }) => (
	<ClassroomQuery LoadingComponent={false} variables={{ uid }}>
		{({ data, loading, queryConfig }) =>
			loading ? (
				<InspectorSkeleton />
			) : (
				<UpdateClassroomMutation>
					{(updateClassroom) => (
						<ClassroomInspector
							classroom={data.classroom}
							classroomQueryConfig={queryConfig}
							updateClassroom={updateClassroom}
							{...baseProps}
						/>
					)}
				</UpdateClassroomMutation>
			)
		}
	</ClassroomQuery>
)
export default Wrapper
