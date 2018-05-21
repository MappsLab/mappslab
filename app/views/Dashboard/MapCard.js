// @flow
import React from 'react'
import type { MapType } from 'App/types'
import { Link } from 'react-router-dom'
import { Column } from 'App/components/Layout'
import { Header2 } from 'App/components/Text'
import { MapPreview } from 'App/components/Maps'

/**
 * MapCard
 */

type Props = {
	title?: void | String,
	map?: Object | MapType,
}

const MapCard = ({ title, map }: Props) => {
	const to = `maps/${(map && map.uid) || 'my-map'}`
	return (
		<Link to={to}>
			<Column>
				<Header2>{title || (map && map.title)}</Header2>
				<MapPreview />
			</Column>
		</Link>
	)
}

MapCard.defaultProps = {
	title: undefined,
	map: {},
}

export default MapCard
