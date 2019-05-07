import * as React from 'react'
import { CustomPopup } from 'mapp'
import NativeListener from 'react-native-listener'
import Pane from '../../../components/Pane'
import { UserChip } from '../../../components/User'
import { useCurrentViewer } from '../../../providers/CurrentViewer'
import { useInspector } from './Provider'
import PinInspector from './PinInspector'
import RouteInspector from './RouteInspector'
import { Header, CloseButton } from './styled'

const { useEffect } = React

export const ItemInspector = () => {
	/* TODO: Set up a useMap() context to get the mapUID */
	const { item, position, mapUid, closeInspector, panTo } = useInspector()
	const { viewer } = useCurrentViewer()

	useEffect(() => {
		if (!item || !position) return
		const yOffset = window.innerHeight / 2 - 150
		panTo(position, { x: 0, y: -yOffset })
	}, [item])

	if (!item) return null

	if (item.__typename !== 'Pin' && item.__typename !== 'Route') {
		throw new Error(`There is no inspector for item type "${item.__typename}"`)
	}

	return (
		<CustomPopup position={position}>
			<Pane size="small">
				<Header>
					{item.owner && <UserChip size="small" user={item.owner} />}
					<NativeListener onClick={closeInspector}>
						<CloseButton level="tertiary" />
					</NativeListener>
				</Header>
				{item.__typename === 'Pin' ? (
					<PinInspector mapUid={mapUid} pin={item} viewer={viewer} />
				) : item.__typename === 'Route' ? (
					<RouteInspector route={item} mapUid={mapUid} viewer={viewer} />
				) : null}
			</Pane>
		</CustomPopup>
	)
}
