// @flow
import * as React from 'react'
import type { ViewerType, MapType } from 'Types'
import { Button } from 'Components/Buttons'
import type { InspectItem } from '../InspectorProvider'
import List from './List'
import EditableText from '../EditableText'

/**
 * MapInspector
 */

type Props = {
	map: MapType,
	viewer: null | ViewerType,
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
			<EditableText label="Description" name="description" initialValue={map.description} />
			<Button to={`/maps/${map.uid}`}>Go to map →</Button>
			<List title="Classrooms" type="classroom" items={classrooms} />
		</React.Fragment>
	)
}

export default MapInspector
