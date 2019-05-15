import * as React from 'react'
import { Map, Viewer, Mutation, QueryConfig } from '../../../types-ts'
import { MapQuery, UpdateMapMutation } from '../../../queries/Map'
import { Button } from '../../Buttons'
import { ClassroomList } from '../../Lists'
import { InspectItem } from '../InspectorProvider'
import EditableText from '../EditableText'
import { EditableMedia } from '../EditableMedia'
import InspectorSkeleton from '../InspectorSkeleton'
import { unwindEdges } from '../../../utils/graphql'

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

const MapInspectorMain = ({ map, viewer, inspectItem, mapQueryConfig, updateMap }: Props) => {
	const [teachers] = unwindEdges(map.classroom.teachers)
	console.log(viewer)
	const viewerIsOwner = Boolean(viewer && teachers.find((t) => t.uid === viewer.uid))
	console.log(viewerIsOwner, map)
	const updateMapClassrooms = (classroom) => {
		const variables = {
			input: {
				uid: map.uid,
				addClassrooms: [classroom.uid],
			},
		}
		updateMap({ variables, refetchQueries: [mapQueryConfig] })
	}

	const submitUpdate = async (args) => {
		if (!viewerIsOwner) throw new Error('You can only update maps you own')
		const variables = {
			uid: map.uid,
			...args,
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
			<EditableMedia
				submitUpdate={submitUpdate}
				enableVideo={false}
				imageName="baseImage"
				image={map.baseImage}
				label="Base Image"
				viewerCanEdit={viewerIsOwner}
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
