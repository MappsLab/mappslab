// @flow
import * as React from 'react'
import type { MappRenderProps, LatLng } from 'mapp'
import { withStateMachine } from 'react-automata'
import type { MachineState } from 'react-automata'
import { CurrentViewerQuery, MapQuery } from 'Queries'
import { CreatePinMutation } from 'Queries/Pin'
import type { MapType, ViewerType, PinType } from 'Types'
import type { Mutation, SubscriptionConfig } from 'Types/GraphQL'
import { getOptionsForState } from './mapOptions'
import statechart from './statechart'

const debug = require('debug')('app')

/**
 * Provider
 */

export type View = 'normal' | 'street'

type Props = MappRenderProps & {
	initialView?: View,
	initialMapUid?: string | null,
	children: React.Node,
	inspectedItem?: PinType | null,

	// MappRenderProps:
	// (copied for reference)
	// googleMap: Map,
	// overlay: OverlayView,
	// utils: {
	// 	zoom: (number) => void,
	// 	zoomIn: () => void,
	// 	zoomOut: () => void,
	// 	panTo: (LatLng, Offset) => void,
	// 	addEventListeners: (eventHandlers: EventHandlers) => void,
	// 	removeEventListeners: (eventHandlers: EventHandlers) => void,
	// },
}

type State = {
	mapUid: string | null,
	userLatLng: LatLng | null,
}

type Utils = $PropertyType<MappRenderProps, 'utils'>

export type ProviderProps = Utils & {
	mapUid: string | null,
	viewer?: ViewerType,
	setMap: (string) => void,
	mapData?: MapType,
	transition: (string, ?{}) => void,
	updateMapState: (string, $Shape<State>) => void,
	createPin: Mutation,
	connectToPin?: {
		pin: PinType,
		position?: 'BEFORE' | 'AFTER',
	},
	userLatLng?: LatLng,
	subscribeToMore: (SubscriptionConfig) => () => void,
	machineState: MachineState,
}

const defaults = {
	mapUid: null,
	viewer: undefined,
	mapData: undefined,
	setMap: () => {},
	createPin: async () => {},
	updateMapState: () => {},
	transition: () => {},
	subscribeToMore: () => () => {},
	machineState: 'none',
}

const { Provider, Consumer } = React.createContext<ProviderProps>(defaults)
export const MapConsumer = Consumer

class MapProviderClass extends React.Component<Props, State> {
	static defaultProps = {
		initialView: 'normal',
		initialMapUid: null,
		inspectedItem: null,
	}

	state = {
		mapUid: this.props.initialMapUid || null,
		userLatLng: null,
	}

	componentDidMount() {
		if (!this.props.errored) this.updateOptions()
	}

	getEditorUtils = () => ({
		setMap: this.setMap,
		updateMapState: this.updateMapState,
	})

	updateOptions = (props: Props = this.props) => {
		const { googleMap, machineState } = props
		const options = getOptionsForState(machineState.value)
		googleMap.setOptions(options)
	}

	componentDidTransition = () => {
		debug(`Transitioned to:`, this.props.machineState.value)
		this.updateOptions()
	}

	setMap = (mapUid: string) => {
		this.setState({ mapUid })
	}

	updateMapState = (newState) => {
		this.setState(newState)
	}

	render() {
		const { children, utils, transition, machineState, inspectedItem, connectToPin } = this.props
		const { mapUid, userLatLng } = this.state
		const value = {
			inspectedItem,
			transition,
			machineState,
			connectToPin,
			userLatLng,
			...utils,
			...this.getEditorUtils(),
		}
		return (
			<CreatePinMutation>
				{(createPin) => (
					<CurrentViewerQuery>
						{({ data: viewerQueryData }) => {
							const viewer = viewerQueryData.currentViewer ? viewerQueryData.currentViewer.viewer : null
							return (
								<MapQuery variables={{ uid: mapUid }} delayQuery={mapUid === null}>
									{({ data: mapQueryData, subscribeToMore }) => (
										<Provider
											value={{
												...value,
												viewer,
												subscribeToMore,
												mapData: mapQueryData ? mapQueryData.map : undefined,
												createPin,
											}}
										>
											{children}
										</Provider>
									)}
								</MapQuery>
							)
						}}
					</CurrentViewerQuery>
				)}
			</CreatePinMutation>
		)
	}
}

export const MapProvider = withStateMachine(statechart)(MapProviderClass)
