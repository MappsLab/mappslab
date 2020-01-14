import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
	Map,
	Classroom,
	Viewer,
	Mutation,
	QueryConfig,
	DataLayer,
} from '../../../types-ts'
import { MapQuery, UpdateMapMutation } from '../../../queries/Map'
import { Button } from '../../Buttons'
import { DataLayerList, ClassroomList } from '../../Lists'
import { InspectItem } from '../InspectorProvider'
import { DataLayerUpload } from '../../DataLayer'
import { Prompt } from '../../Forms'
import EditableText from '../EditableText'
import { EditableMedia } from '../EditableMedia'
import InspectorSkeleton from '../InspectorSkeleton'
import { useQuestion } from '../../../components/Question'

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

const validateImageDimensions = (file: File): Promise<string | void> =>
	new Promise((resolve) => {
		// @ts-ignore
		const img = new window.Image()

		img.onload = (e: Event) => {
			// @ts-ignore
			if (e.target.naturalWidth < 1024 || e.target.naturalHeight < 1024) {
				resolve('Base map images must be at 1024px wide and 1024px tall')
			} else {
				resolve(undefined)
			}
		}
		img.onerror = () => {
			resolve('Sorry, there was an error uploading your image.')
		}
		img.src = window.URL.createObjectURL(file)
	})

const MapInspectorMain = ({
	map,
	viewer,
	inspectItem,
	mapQueryConfig,
	updateMap,
}: Props) => {
	const { ask } = useQuestion()
	const teachers =
		map.classroom.teachers && map.classroom.teachers.edges
			? unwindEdges(map.classroom.teachers)[0]
			: []
	const dataLayers =
		map.dataLayers && map.dataLayers.edges ? unwindEdges(map.dataLayers)[0] : []
	const viewerIsOwner = Boolean(
		viewer && teachers.find((t) => t.uid === viewer.uid),
	)

	const updateMapClassrooms = (classroom: Classroom) => {
		const variables = {
			input: {
				uid: map.uid,
				addClassrooms: [classroom.uid],
			},
		}
		updateMap({ variables, refetchQueries: [mapQueryConfig] })
	}

	const addNewDataLayer = async (title: string) => {
		const handleUpload = async (kml: File) => {
			const variables = {
				uid: map.uid,
				createDataLayer: {
					title,
					kml,
				},
			}
			await updateMap({ variables, refetchQueries: [mapQueryConfig] })
		}

		await ask({
			message: 'Upload a Data Layer (KML) file',
			render: (answer) => (
				<DataLayerUpload onComplete={answer} handleUpload={handleUpload} />
			),
		})
	}

	const associateDataLayer = async (dataLayer: DataLayer) => {
		const { uid } = dataLayer
		const variables = {
			uid: map.uid,
			associateDataLayer: { uid },
		}
		await updateMap({ variables, refetchQueries: [mapQueryConfig] })
	}

	const removeDataLayer = async (dataLayer: DataLayer) => {
		const variables = {
			uid: map.uid,
			removeDataLayer: {
				uid: dataLayer.uid,
			},
		}
		const confirm = await ask({
			message: 'Are you sure?',
			options: [
				{ title: 'Cancel', returnValue: false, level: 'secondary' },
				{ title: 'Yes', returnValue: true, level: 'primary' },
			],
		})
		if (confirm === true) {
			await updateMap({ variables, refetchQueries: [mapQueryConfig] })
		}
	}

	const submitUpdate = async (args) => {
		if (!viewerIsOwner) throw new Error('You can only update maps you own')
		const variables = {
			uid: map.uid,
			...args,
		}

		if (args.baseImage) {
			ask({
				message:
					'Processing map tiles takes several minutes. You may navigate away from this page and the map will automatically update when the tiles are ready.',
			})
		}
		return updateMap({ variables, refetchQueries: [mapQueryConfig] })
	}

	return (
		<React.Fragment>
			<EditableText
				label="Description"
				name="description"
				initialValue={map.description}
			/>
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
				validateImage={validateImageDimensions}
				imageName="baseImage"
				image={map.baseImage}
				label="Base Image"
				viewerCanEdit={viewerIsOwner}
			/>
			<DataLayerList
				dataLayers={dataLayers}
				removeDataLayer={removeDataLayer}
				addNewDataLayer={addNewDataLayer}
				associateDataLayer={associateDataLayer}
				viewerCanAdd={viewerIsOwner}
				title="Data Layers"
			/>
		</React.Fragment>
	)
}

export const MapInspector = ({
	uid,
	...baseProps
}: BaseProps & { uid: string }) => (
	<MapQuery LoadingComponent={false} variables={{ uid }}>
		{({ data, loading, queryConfig }) =>
			loading ? (
				<InspectorSkeleton />
			) : (
				<UpdateMapMutation>
					{(updateMap) => (
						<MapInspectorMain
							map={data.map}
							mapQueryConfig={queryConfig}
							updateMap={updateMap}
							{...baseProps}
						/>
					)}
				</UpdateMapMutation>
			)
		}
	</MapQuery>
)
