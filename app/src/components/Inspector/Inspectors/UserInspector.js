// @flow
import * as React from 'react'
import type { ViewerType, UserType } from 'Types'
import type { InspectItem } from '../InspectorProvider'
import List from './List'

/**
 * UserInspector
 */

type Props = {
	user: UserType,
	viewer: null | ViewerType,
	inspectItem: InspectItem,
}

const UserInspector = (props: Props) => {
	const { user, inspectItem } = props

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
	return <List title="Classrooms" type="classroom" items={classrooms} />
}

export default UserInspector
