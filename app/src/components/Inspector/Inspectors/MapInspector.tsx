import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Classroom, DataLayer } from '../../../types-ts'
import {
	useMapQuery,
	useUpdateMapMutation,
	UseUpdateMapVariables,
} from '../../../queries/map'
import { Button } from '../../Buttons'
import { DataLayerList, ClassroomList } from '../../Lists'
import { useInspector } from '../InspectorProvider'
import { DataLayerUpload } from '../../DataLayer'
import { EditableText } from '../EditableText'
import { EditableMedia } from '../EditableMedia'
import { useQuestion } from '../../../components/Question'
import { useCurrentViewer } from '../../../providers/CurrentViewer'

/**
 * MapInspector
 */

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

interface Props {
	mapUid: string
}

export const MapInspector = ({ mapUid }: Props) => {
	const { viewer } = useCurrentViewer()
	const { inspectItem } = useInspector()
	const [updateMap] = useUpdateMapMutation(mapUid)
	const response = useMapQuery({ variables: { uid: mapUid } })
	const { ask } = useQuestion()

	const map = response?.data?.map
	if (response.loading || !map) return null

	const [teachers] = unwindEdges(map?.classroom?.teachers)
	const dataLayers =
		map.dataLayers && map.dataLayers.edges ? unwindEdges(map.dataLayers)[0] : []
	const viewerIsOwner = Boolean(
		viewer && teachers.find((t) => t.uid === viewer.uid),
	)

	const updateMapClassrooms = (classroom: Classroom) => {
		const variables = {
			uid: map.uid,
			addClassrooms: [classroom.uid],
		}
		updateMap({ variables })
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
			await updateMap({ variables })
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
		const r = await updateMap({ variables })
		console.log({ r })
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
			await updateMap({ variables })
		}
	}

	const submitUpdate = async (args: Omit<UseUpdateMapVariables, 'uid'>) => {
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
		await updateMap({ variables })
		return
	}

	const classroomItems = map?.classroom ? [map.classroom] : []

	return (
		<React.Fragment>
			<EditableText name="description" initialValue={map.description || ''} />
			<Button to={`/maps/${map.uid}`} onClick={() => inspectItem(null)}>
				Go to map →
			</Button>
			<ClassroomList
				title="Classroom"
				items={classroomItems}
				update={updateMapClassrooms}
				onItemClick={inspectItem}
				viewerCanAdd={false}
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
				title="Data Layers"
				items={dataLayers}
				remove={removeDataLayer}
				create={addNewDataLayer}
				onSearchResultClick={associateDataLayer}
				viewerCanAdd={viewerIsOwner}
			/>
		</React.Fragment>
	)
}
