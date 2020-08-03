import * as React from 'react'
import { useCurrentMap } from '../../providers/CurrentMap'
import { WelcomeDialog } from './WelcomeDialog'
import { MapNavigation } from './MapNavigation'
import { MapNotifications } from './MapNotifications'
import { MapData } from './MapData'
import { useCurrentViewer } from '../../providers/CurrentViewer'
import { Tools } from './Tools'
import { NotLoggedIn } from './NotLoggedIn'
import { useState } from 'react'
import _ from 'lodash'
import { unwindEdges } from '@good-idea/unwind-edges'

const { useEffect } = React

interface MapEditorProps {
	mapUid: string
}

export const MapEditor = ({ mapUid }: MapEditorProps) => {
	const { mapData, setMapUid, mode } = useCurrentMap()
	const { viewer } = useCurrentViewer()
	const [enabledLayers, setEnabledLayers] = useState<string[]>([])

	const [layers] = mapData && mapData.dataLayers ? unwindEdges(mapData.dataLayers) : []

	useEffect(() => {
		if (mapUid !== mapData?.uid) {
			setMapUid(mapUid)
		}
	}, [mapUid, mapData])

	if (!mapData) return null

	return (
		<React.Fragment>
			<div id='map-mode'>{JSON.stringify(mode.value)}</div>
			<WelcomeDialog map={mapData} />
			{viewer ? (
				<Tools
					enabledLayers={enabledLayers}
					enableLayer={(id) => setEnabledLayers(prevState => [...prevState, id])}
					disableLayer={(id) => setEnabledLayers(prevState => _.omit(prevState, id))}
					layers={layers || []}
				/>
			) : (
				<NotLoggedIn />
			)}
			<MapNavigation map={mapData} />
			<MapNotifications />
			<MapData enabledLayers={enabledLayers}/>
		</React.Fragment>
	)
}

