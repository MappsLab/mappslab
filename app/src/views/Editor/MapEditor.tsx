import * as React from 'react'
import { useState } from 'react'
import { useCurrentMap } from '../../providers/CurrentMap'
import { WelcomeDialog } from './WelcomeDialog'
import { MapNavigation } from './MapNavigation'
import { MapNotifications } from './MapNotifications'
import { MapData } from './MapData'
import { useCurrentViewer } from '../../providers/CurrentViewer'
import { Tools } from './Tools'
import { NotLoggedIn } from './NotLoggedIn'
import { unwindEdges } from '@good-idea/unwind-edges'
import { MapEvents } from './MapEvents'
import { InspectorProvider, ItemInspector } from './ItemInspector'

const { useEffect } = React

interface MapEditorProps {
	mapUid: string
}

type MapEvent<EventType> = {
	payload: EventType
	actions: {
		[key: string]: (arg: any) => void
	}
}

export const MapEditor = ({ mapUid }: MapEditorProps) => {
	const { mapData, setMapUid, mode } = useCurrentMap()
	const { viewer } = useCurrentViewer()
	const [enabledLayers, setEnabledLayers] = useState<string[]>([])

	const [layers] =
		mapData && mapData.dataLayers ? unwindEdges(mapData.dataLayers) : []

	useEffect(() => {
		if (mapUid !== mapData?.uid) {
			setMapUid(mapUid)
		}
	}, [mapUid, mapData])

	if (!mapData) return null

	return (
		<React.Fragment>
			<InspectorProvider>
				<div id="map-mode">{JSON.stringify(mode.value)}</div>
				<MapEvents mapUid={mapUid} />
				<WelcomeDialog map={mapData} />
				{viewer ? (
					<Tools
						enabledLayers={enabledLayers}
						enableLayer={(id) =>
							setEnabledLayers((prevState) => [...prevState, id])
						}
						disableLayer={(id) =>
							setEnabledLayers((prevState) => prevState.filter((l) => l !== id))
						}
						layers={layers || []}
					/>
				) : (
					<NotLoggedIn />
				)}
				<MapNavigation map={mapData} />
				<MapNotifications />
				<ItemInspector />
				<MapData enabledLayers={enabledLayers} />
			</InspectorProvider>
		</React.Fragment>
	)
}
