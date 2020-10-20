import * as React from 'react'
import { InfoWindow } from '@react-google-maps/api'
import NativeListener from 'react-native-listener'
import { Pane } from '../../../components/Pane'
import { UserChip } from '../../../components/User'
import { useInspector } from './Provider'
import { PinInspector } from './PinInspector'
import { RouteInspector } from './RouteInspector'
import { Header, CloseButton } from './styled'
import { createGlobalStyle } from 'styled-components'
import { useCurrentMap } from '../../../providers/CurrentMap'
import { MediaModal } from './MediaModal'

const { useState } = React

const GlobalStyles = createGlobalStyle`
	.gm-style-iw {
	  padding: 0 !important;
    
    .gm-style-iw-d {
    	overflow: auto !important;
    }
		button[title='Close'] {
			display: none !important;
		}
	}
`

export const ItemInspector = () => {
	const { mapUid } = useCurrentMap()
	const { item, position, closeInspector } = useInspector()

	const [mediaOpen, setMediaOpen] = useState(false)

	const openMedia = () => setMediaOpen(true)
	const closeMedia = () => setMediaOpen(false)

	if (!item || !mapUid) return null

	if (item.__typename !== 'Pin' && item.__typename !== 'Route') {
		// @ts-ignore
		throw new Error(`There is no inspector for item type "${item.__typename}"`)
	}

	console.log({ mediaOpen })
	return (
		<React.Fragment>
			<GlobalStyles />
			<InfoWindow position={position} onCloseClick={closeInspector}>
				<Pane size="small">
					<Header>
						{item.owner && <UserChip size="small" user={item.owner} />}
						<NativeListener onClick={closeInspector}>
							<CloseButton level="tertiary" />
						</NativeListener>
					</Header>
					{item.__typename === 'Pin' && (
						<PinInspector openMedia={openMedia} mapUid={mapUid} pin={item} />
					)}
					{item.__typename === 'Route' && (
						<RouteInspector route={item} mapUid={mapUid} />
					)}
				</Pane>
			</InfoWindow>

			{mediaOpen && item.__typename === 'Pin' ? (
				<MediaModal pin={item} close={closeMedia} />
			) : null}
		</React.Fragment>
	)
}
