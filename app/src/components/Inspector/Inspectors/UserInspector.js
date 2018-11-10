// @flow
import * as React from 'react'
import type { ViewerType, UserType } from 'Types'
import { UserQuery } from 'Queries'
import { Header1, Header4 } from 'Components/Text'
import type { InspectItem } from '../InspectorProvider'
import List from './List'

/**
 * UserInspector
 */

type Props = {
	user: UserType,
	viewer: ViewerType,
	inspectItem: InspectItem,
}

const UserInspector = (props: Props) => {
	const { user, inspectItem } = props
	const role = user.roles.includes('admin') ? 'admin' : user.roles.includes('teacher') ? 'teacher' : 'student'

	const classrooms = user.classrooms
		? user.classrooms.map((c) => ({
				key: c.uid,
				title: c.title,
				info: [],
				onClick: () => {
					inspectItem({ uid: c.uid, type: 'classroom', title: c.title })
				},
		  }))
		: []
	return (
		<React.Fragment>
			<Header1>{user.name}</Header1>
			<Header4>{role}</Header4>
			<List title="Classrooms" items={classrooms} />
		</React.Fragment>
	)
}

type BaseProps = {
	viewer: ViewerType,
	uid: string,
	inspectItem: InspectItem,
}

export default ({ uid, ...baseProps }: BaseProps) => (
	<UserQuery variables={{ uid }}>{({ data }) => <UserInspector user={data.user} {...baseProps} />}</UserQuery>
)
