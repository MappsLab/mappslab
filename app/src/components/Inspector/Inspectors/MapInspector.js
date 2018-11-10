// @flow
import * as React from 'react'
import type { ViewerType, UserType, MapType } from 'Types'
import { MapQuery } from 'Queries'
import { Header1, Header4 } from 'Components/Text'
import type { InspectItem } from '../InspectorProvider'
import List from './List'

/**
 * MapInspector
 */

type Props = {
	map: MapType,
	viewer: ViewerType,
	inspectItem: InspectItem,
}

const MapInspector = (props: Props) => {
	const { map, inspectItem } = props
	const { classroom } = map

	const classrooms = [
		{
			key: classroom.uid,
			title: classroom.title,
			info: [],
			onClick: () => {
				inspectItem({ uid: classroom.uid, type: 'classroom', title: classroom.title })
			},
		},
	]

	return (
		<React.Fragment>
			<Header1>{map.title}</Header1>
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
	<MapQuery variables={{ uid }}>{({ data }) => <MapInspector map={data.map} {...baseProps} />}</MapQuery>
)
