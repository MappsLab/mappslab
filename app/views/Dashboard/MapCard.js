// @flow
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Header2 } from 'Components/Text'
import { MapPreview } from 'Components/Dashboard'

const Wrapper = styled.div`
	width: 300px;
`

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
			<Wrapper>
				<Header2>{title}</Header2>
				<MapPreview />
			</Wrapper>
		</Link>
	)
}

MapCard.defaultProps = {
	userUid: null,
	uid: null,
}

export default MapCard
