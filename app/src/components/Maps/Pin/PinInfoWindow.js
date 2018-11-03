// @flow
import React from 'react'
import Mapp from 'mapp'

/**
 * Pin
 */

type Props = {
	anchor?: any,
	onCloseClick?: () => void,
	onDomReady?: () => void,
	onPositionChanged?: () => void,
	onZindexChanged?: () => void,
}

/**
 * PinInfoWindow
 */

const PinInfoWindow = (props: Props) => {
	return <Mapp.InfoWindow {...props} />
}

PinInfoWindow.defaultProps = {
	anchor: null,
	onCloseClick: () => {},
	onDomReady: () => {},
	onPositionChanged: () => {},
	onZindexChanged: () => {},
}
export default PinInfoWindow
