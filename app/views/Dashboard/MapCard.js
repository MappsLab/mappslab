// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { Column } from 'Components/Layout'
import { Header2 } from 'Components/Text'
import { MapPreview } from 'Components/Dashboard'

/**
 * MapCard
 */

type Props = {
	title: string,
	userUid?: string,
	uid?: string,
}

const MapCard = ({ uid, userUid, title }: Props) => {
	if (userUid === null && uid === null) throw new Error('You must supply either a map uid or userUid')
	const to = userUid ? `/maps/user/${userUid}` : `/maps/${uid}`
	return (
		<Link to={to}>
			<Column>
				<Header2>{title}</Header2>
				<MapPreview />
			</Column>
		</Link>
	)
}

MapCard.defaultProps = {
	userUid: null,
	uid: null,
}

export default MapCard
