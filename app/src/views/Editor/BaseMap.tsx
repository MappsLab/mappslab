import * as React from 'react'
import Mapp, { MappRenderProps } from 'mapp'
import { MapProvider, MapConsumer } from './Provider'

/**
 * Wrapper with:
 *  - Mapp: Mapp loader
 *  - MapProvider: Context Provider
 *  - MapConsumer: Context Consumer
 */

type Props = {
	APIKey: string
	initialOptions?: any
	render: (props: MappRenderProps) => React.ReactNode
}

const defaultOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 6,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
	mapTypeControlOptions: {
		mapTypeIds: ['baseImage'],
	},
}

export const BaseMap = ({ APIKey, initialOptions, render }: Props) => (
	<Mapp
		//
		APIKey={APIKey}
		initialOptions={initialOptions || defaultOptions}
		render={(mappRenderProps) => (
			<MapProvider {...mappRenderProps}>
				<MapConsumer>
					{(mapTools) => (render ? render(mapTools) : null)}
				</MapConsumer>
			</MapProvider>
		)}
	/>
)

BaseMap.defaultProps = {
	initialOptions: defaultOptions,
}
