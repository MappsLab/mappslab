import * as React from 'react'
import { useCurrentMap } from '../../providers/CurrentMap'

const { useEffect } = React

interface MapEditorProps {
	mapUid: string
}

export const MapEditor = ({ mapUid }: MapEditorProps) => {
	const { mapData, setMapUid } = useCurrentMap()

	useEffect(() => {
		if (mapUid !== mapData?.uid) {
			setMapUid(mapUid)
		}
	}, [mapUid, mapData])

	return <div>...</div>
}
