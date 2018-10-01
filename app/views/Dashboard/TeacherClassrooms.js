// @flow
import * as React from 'react'
import { CreateClassroomMutation } from 'Queries/Classroom'
import { ClassroomCard } from 'Components/Classroom'
import type { UserType } from 'Types/User'
import type { ClassroomType } from 'Types/Classroom'

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
	<CreateClassroomMutation>
		{(createClassroom) => {
			return classrooms.map((classroom) => <ClassroomCard classroom={classroom} />)
		}}
	</CreateClassroomMutation>
)

export default TeacherClassrooms
