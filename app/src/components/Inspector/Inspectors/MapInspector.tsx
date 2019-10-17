import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Map, Viewer, Mutation, QueryConfig } from '../../../types-ts'
import { MapQuery, UpdateMapMutation } from '../../../queries/Map'
import { Button } from '../../Buttons'
import { DataLayerList, ClassroomList } from '../../Lists'
import { InspectItem } from '../InspectorProvider'
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

		img.onload = (e) => {
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

const MapInspectorMain = ({ map, viewer, inspectItem, mapQueryConfig, updateMap }: Props) => {
	const { ask } = useQuestion()
	const teachers = map.classroom.teachers && map.classroom.teachers.edges ? unwindEdges(map.classroom.teachers)[0] : []
	const dataLayers = map.dataLayers && map.dataLayers.edges ? unwindEdges(map.dataLayers)[0] : []
	const viewerIsOwner = Boolean(viewer && teachers.find((t) => t.uid === viewer.uid))
	const updateMapClassrooms = (classroom) => {
		const variables = {
			input: {
				uid: map.uid,
				addClassrooms: [classroom.uid],
			},
		}
		updateMap({ variables, refetchQueries: [mapQueryConfig] })
	}

	const addNewDataLayer = async (title: string) => {
		const kmlUrlQuestion = await ask({
			message: 'Enter a URL for this Data layer. (must be a .kml file)',
			render: (answer) => <Prompt answer={answer} name="url" label="KML URL" type="url" />,
		})

		const url = kmlUrlQuestion.url.trim()
		if (/^https:\/\/(.*)\.kml$/.test(url)) {
			const variables = {
				uid: map.uid,
				dataLayer: {
					title,
					url,
				},
			}
			updateMap({ variables, refetchQueries: [mapQueryConfig] })
		} else {
			ask({
				message: 'The URL of the data file must end in .kml',
			})
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
				validateImage={validateImageDimensions}
				imageName="baseImage"
				image={map.baseImage}
				label="Base Image"
				viewerCanEdit={viewerIsOwner}
			/>
			<DataLayerList dataLayers={dataLayers} addNewDataLayer={addNewDataLayer} viewerCanAdd={viewerIsOwner} title="Data Layers" />
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
