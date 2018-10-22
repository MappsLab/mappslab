// @flow
import React from 'react'
import { MapProvider, MapConsumer } from './Provider'

/**
 * Main Map Component
 */

type Props = {
	APIKey: string,
}

type State = {
	// ...
}

class Map extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	// state: {}

	render() {
		return <div>MyComponent Component</div>
	}
}

/**
 * Wrapper with:
 *  - Mapp: Mapp loader
 *  - MapProvider: Context Provider
 *  - MapConsumer: Context Consumer
 */

const initialOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

const Wrapped = ({ googleMap, ...componentProps }) => (
	<MapProvider {...googleMap}>
		<MapConsumer>{(mapRenderProps) => <Map {...mapRenderProps} />}</MapConsumer>
	</MapProvider>
)
export default Wrapped
