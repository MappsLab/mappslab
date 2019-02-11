// @flow
import * as React from 'react'
import type { ClassroomType } from 'Types/Classroom'
import type { ViewerType, UserType } from 'Types/User'
import { AdminQuery } from 'Queries/Admin'
import Pane from 'Components/Pane'
import { List } from 'Components/Lists'
import type { InspectItem } from '../InspectorProvider'

/**
 * AdminInspector
 */

type BaseProps = {
	viewer: ViewerType,
	inspectItem: InspectItem,
}

type Props = BaseProps & {
	classrooms: Array<ClassroomType>,
	teachers: Array<UserType>,
	students: Array<UserType>,
}

const AdminInspector = (props: Props) => {
	console.log(props)
	const { classrooms } = props
	if (!classrooms) return null
	return (
		<Pane size="full" title="Admin">
			<List title="Classrooms" type="classroom" items={classrooms} />
		</Pane>
	)
}

const Wrapper = (baseProps: BaseProps) => (
	<AdminQuery>{({ data, loading }) => (loading ? null : <AdminInspector {...data} {...baseProps} />)}</AdminQuery>
)

export default Wrapper
