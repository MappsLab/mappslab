// @flow
import * as React from 'react'
import { CustomPopup } from 'mapp'
import { PopupWrapper } from 'Components/InfoPopup'
import type { LatLngLiteral } from 'mapp'
import type { RouteType } from 'Types/Route'
/**
 * RouteHoverPopup
 */

type Props = {
	route: RouteType,
	position: LatLngLiteral,
}

const RouteHoverPopup = ({ route, position }: Props) => {
	// console.log(position.lat(), position.lng())
	return (
		<CustomPopup position={position}>
			<PopupWrapper noTouchEvents>
				<p>{route.title}</p>
			</PopupWrapper>
		</CustomPopup>
	)
}

export default RouteHoverPopup
