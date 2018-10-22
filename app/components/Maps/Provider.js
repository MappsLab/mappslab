// @flow
import * as React from 'react'
import { CurrentViewerQuery, MapQuery } from 'Queries'
import type { MappRenderProps, MappUtils } from 'mapp'
import type { MapType, ViewerType } from 'Types'
import { getOptionsForView } from './mapOptions'

// import type { MappRenderProps, MappUtils } from 'mapp/types'

const { Provider, Consumer } = React.createContext({})

export const MapConsumer = Consumer

/**
 * Provider
 */

export type View = 'normal' | 'addPin' | 'street' | 'inspect'

type Notification = {
	text: string,
	title: string,
}

export type ProviderProps = MappUtils & {
	viewer?: ViewerType,
	setMap: (string) => void,
	mapData?: MapType,
	setView: (View) => void,
	mapView: View,
	setInspectItem: (string) => void,
	inspectedItem?: string,
	sendNotification: (Notification) => void,
}

// export type MappUtils = {
// 	zoom: (number) => void,
// 	zoomIn: () => void,
// 	zoomOut: () => void,
// 	panTo: (LatLng, Offset) => void,
// 	addEventListeners: (eventHandlers: EventHandlers) => void,
// 	removeEventListeners: (eventHandlers: EventHandlers) => void,
// }

// export type MappRenderProps = {
// 	googleMap: Map,
// 	overlay: OverlayView,
// 	utils: MappUtils,
// }

type Props = MappRenderProps & {
	initialView?: View,
	initialMapUid?: string | null,
	children: React.Node,
}

type State = {
	mapUid: string | null,
	mapView: View,
	inspectedItem: string | null,
	// layers: Array<Layer>
}

export class MapProvider extends React.Component<Props, State> {
	static defaultProps = {
		initialView: 'normal',
		initialMapUid: null,
	}

	state = {
		mapUid: this.props.initialMapUid || null,
		mapView: this.props.initialView || 'normal',
		inspectedItem: null,
	}

	getEditorUtils = () => ({
		setView: this.setView,
		setMap: this.setMap,
		setInspectItem: this.setInspectItem,
		sendNotification: this.sendNotification,
	})

	updateOptionsForView = (view: View = this.state.mapView) => {
		const { googleMap } = this.props
		const options = getOptionsForView(view)
		console.log(options)
		googleMap.setOptions(options)
	}

	setView = (mapView: View) => {
		this.setState({ mapView }, () => {
			this.updateOptionsForView(mapView)
		})
	}

	setMap = (mapUid: string) => {
		this.setState({ mapUid })
	}

	setInspectItem = (itemUid: string | null) => {
		this.setState({ inspectedItem: itemUid })
	}

	sendNotification = (message: Notification) => {
		console.log(message)
	}

	render() {
		const { children, utils } = this.props
		const { mapUid, mapView, inspectedItem } = this.state
		const value = {
			mapView,
			inspectedItem,
			...utils,
			...this.getEditorUtils(),
		}
		return (
			<CurrentViewerQuery>
				{({ data: viewerQueryData }) => (
					<MapQuery variables={{ uid: mapUid }} delayQuery={mapUid === null}>
						{({ data: mapQueryData }) => (
							<Provider
								value={{
									...value,
									viewer: viewerQueryData.currentViewer.viewer,
									mapData: mapQueryData.map,
								}}
							>
								{children}
							</Provider>
						)}
					</MapQuery>
				)}
			</CurrentViewerQuery>
		)
	}
}
