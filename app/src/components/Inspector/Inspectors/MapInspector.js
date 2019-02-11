// @flow
import * as React from 'react'
import type { MapType } from 'Types/Map'
import type { Mutation, QueryConfig } from 'Types/GraphQL'
import { MapQuery, UpdateMapMutation } from 'Queries/Map'
import { Button } from 'Components/Buttons'
import { ClassroomList } from 'Components/Lists'
import type { InspectItem } from '../InspectorProvider'
import EditableText from '../EditableText'
import InspectorSkeleton from '../InspectorSkeleton'

/**
 * MapInspector
 */

type BaseProps = {
	// viewer: null | ViewerType,
	inspectItem: InspectItem,
}

type Props = BaseProps & {
	map: MapType,
	mapQueryConfig: QueryConfig,
	updateMap: Mutation,
}

const MapInspector = ({ map, inspectItem, mapQueryConfig, updateMap }: Props) => {
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
			/>
		</React.Fragment>
	)
}

const Wrapper = ({ uid, ...baseProps }: BaseProps & { uid: string }) => (
	<MapQuery LoadingComponent={false} variables={{ uid }}>
		{({ data, loading, queryConfig }) =>
			loading ? (
				<InspectorSkeleton />
			) : (
				<UpdateMapMutation>
					{(updateMap) => <MapInspector map={data.map} mapQueryConfig={queryConfig} updateMap={updateMap} {...baseProps} />}
				</UpdateMapMutation>
			)
		}
	</MapQuery>
)

export default Wrapper
