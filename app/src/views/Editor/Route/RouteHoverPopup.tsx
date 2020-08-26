import * as React from 'react'
import { InfoWindow } from '@react-google-maps/api'
import { PopupWrapper } from '../../../components/InfoPopup'
import { LatLngLiteral, Route } from '../../../types-ts'
/**
 * RouteHoverPopup
 */

type Props = {
	route: Route
	position: LatLngLiteral
}

export const RouteHoverPopup = ({ route, position }: Props) => {
	return (
		<InfoWindow position={position}>
			<PopupWrapper noTouchEvents>
				<p>{route.title || 'Untitled Route'}</p>
			</PopupWrapper>
		</InfoWindow>
	)
}

