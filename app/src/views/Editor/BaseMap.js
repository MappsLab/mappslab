// @flow
import * as React from 'react'
import Mapp from 'mapp'
import type { MappRenderProps } from 'mapp'
import { MapProvider, MapConsumer } from './Provider'

/**
 * Wrapper with:
 *  - Mapp: Mapp loader
 *  - MapProvider: Context Provider
 *  - MapConsumer: Context Consumer
 */

type Props = {
	APIKey: string,
	initialOptions?: any,
	render: (MappRenderProps) => React.Node,
}

const defaultOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

const WrappedMap = ({ APIKey, initialOptions, render }: Props) => (
	<Mapp
		//
		APIKey={APIKey}
		initialOptions={initialOptions || defaultOptions}
		render={(mappRenderProps) => (
			<MapProvider {...mappRenderProps}>
				<MapConsumer>{(mapTools) => (render ? render(mapTools) : null)}</MapConsumer>
			</MapProvider>
		)}
	/>
)

WrappedMap.defaultProps = {
	initialOptions: defaultOptions,
}

// const WrappedMap = ({ googleMap, ...componentProps }) => (
// 	<Mapp
// 	//
// 	APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
// 	initialOptions={initialOptions}
// 	render={(googleMapProps) => (

// 		<MapProvider {...googleMap}>
// 			<MapConsumer>{(mapRenderProps) => <Map {...mapRenderProps} />}</MapConsumer>
// 		</MapProvider>
// 	)}
// />

export default WrappedMap
