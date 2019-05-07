// @flow
import * as React from 'react'
import { Map, Viewer, Mutation, QueryConfig } from '../../../types-ts'
import { MapQuery, UpdateMapMutation } from '../../../queries/Map'
import { Button } from '../../Buttons'
import { ClassroomList } from '../../Lists'
import { InspectItem } from '../InspectorProvider'
import EditableText from '../EditableText'
import InspectorSkeleton from '../InspectorSkeleton'

/**
 * MapInspector
 */

interface BaseProps {
	viewer: null | Viewer
	inspectItem: InspectItem
}

interface Props extends BaseProps {
	map: Map
	mapQueryConfig: QueryConfig
	updateMap: Mutation
}

const MapInspectorMain = ({ map, inspectItem, mapQueryConfig, updateMap }: Props) => {
	const updateMapClassrooms = (classroom) => {
		const variables = {
			input: {
				uid: map.uid,
				addClassrooms: [classroom.uid],
			},
		}
		updateMap({ variables, refetchQueries: [mapQueryConfig] })
	}

	return (
		<React.Fragment>
			<EditableText label="Description" name="description" initialValue={map.description} />
			<Button to={`/maps/${map.uid}`}>Go to map →</Button>
			<ClassroomList
				title="Classroom"
				items={[map.classroom].filter(Boolean)}
				update={updateMapClassrooms}
				onItemClick={inspectItem}
				viewerCanAdd={false}
				create={() => {}}
			/>
		</React.Fragment>
	)
}

export const MapInspector = ({ uid, ...baseProps }: BaseProps & { uid: string }) => (
	<MapQuery LoadingComponent={false} variables={{ uid }}>
		{({ data, loading, queryConfig }) =>
			loading ? (
				<InspectorSkeleton />
			) : (
				<UpdateMapMutation>
					{(updateMap) => <MapInspectorMain map={data.map} mapQueryConfig={queryConfig} updateMap={updateMap} {...baseProps} />}
				</UpdateMapMutation>
			)
		}
	</MapQuery>
)
