// @flow
import * as React from 'react'
import { CustomPopup } from 'mapp'
import { PopupWrapper } from 'Components/InfoPopup'
import { LatLngLiteral } from 'mapp'
import { Route } from 'Types'
/**
 * RouteHoverPopup
 */

type Props = {
	route: Route
	position: LatLngLiteral
}

const RouteHoverPopup = ({ route, position }: Props) => {
	return (
		<CustomPopup position={position}>
			<PopupWrapper noTouchEvents>
				<p>{route.title || 'Untitled Route'}</p>
			</PopupWrapper>
		</CustomPopup>
	)
}

export default RouteHoverPopup
