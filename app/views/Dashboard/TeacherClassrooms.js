// @flow
import * as React from 'react'
import { CreateClassroomMutation } from 'Queries/Classroom'
import { ClassroomCard } from 'Components/Classroom'
import type { UserType } from 'Types/User'
import type { ClassroomType } from 'Types/Classroom'
import { Consumer as EntityBrowserConsumer } from 'Components/EntityBrowser'
import type { RenderProps } from 'Components/EntityBrowser'

/**
 * MyComponent
 */

type Props = {
	viewer: UserType,
	classrooms: Array<ClassroomType>,
}

/**
 * TeacherClassrooms
 */

const TeacherClassrooms = ({ classrooms }: Props) => (
	<EntityBrowserConsumer>
		{({ navigateTo }: RenderProps) => {
			const handleClick = (entity) => () => {
				navigateTo(entity)
			}
			return (
				<CreateClassroomMutation>
					{(createClassroom) => {
						return classrooms.map((classroom) => (
							<ClassroomCard onClick={handleClick(classroom)} key={classroom.uid} classroom={classroom} />
						))
					}}
				</CreateClassroomMutation>
			)
		}}
	</EntityBrowserConsumer>
)

export default TeacherClassrooms
