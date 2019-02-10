// @flow
import * as React from 'react'
import { UserQuery } from 'Queries'
import type { ViewerType } from 'Types/User'
import UserInspector from './UserInspector'
import InspectorSkeleton from '../../InspectorSkeleton'
import type { InspectItem } from '../../InspectorProvider'
/**
 * UserInspectorWrapper
 */

type Props = {
	uid: string,
	viewer: null | ViewerType,
	inspectItem: InspectItem,
}

const UserInspectorWrapper = ({ uid, viewer, inspectItem }: Props) => (
	<UserQuery variables={{ uid }} LoadingComponent={false}>
		{({ data, loading }) => {
			const { user } = data
			return loading ? <InspectorSkeleton /> : <UserInspector viewer={viewer} user={user} inspectItem={inspectItem} />
		}}
	</UserQuery>
)

export default UserInspectorWrapper
