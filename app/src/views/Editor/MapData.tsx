import * as React from 'react'
import { useState } from 'react'
import { useCurrentMap } from '../../providers/CurrentMap'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Pin } from './Pin'
import { Route } from './Route'
import { DataLayer } from './DataLayer'

const { useEffect } = React

interface MapDataProps {
	enabledLayers: string[]
}

export const MapData = ({enabledLayers}: MapDataProps) => {
	const { mapData, setMapUid } = useCurrentMap()

	if (!mapData) return null

	const [pins] = unwindEdges(mapData.pins)
	const [routes] = unwindEdges(mapData.routes)
	const [dataLayers] = unwindEdges(mapData.dataLayers)

	return (
		<React.Fragment>
			{pins && pins.map((p) => <Pin key={p.uid} pin={p}/>)}
			{routes && routes.map((r) => <Route key={r.uid} route={r}/>)}
			{dataLayers &&
				dataLayers
					.filter((l) => enabledLayers.includes(l.uid))
					.map((l) => (
						<DataLayer
							key={l.uid}
							dataLayer={l}
							applyDataLayer={this.props.applyDataLayer}
						/>
					))
			}
		</React.Fragment>
	)
}
