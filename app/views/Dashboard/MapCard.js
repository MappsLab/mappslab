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

type Props = MapType

const MapCard = ({ title, uid }: Props) => {
	return (
		<Link to={`/maps/${uid}`}>
			<Column>
				<Header2>{title}</Header2>
				<MapPreview />
			</Column>
		</Link>
	)
}

export default MapCard
