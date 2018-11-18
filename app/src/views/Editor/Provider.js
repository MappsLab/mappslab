// @flow
import * as React from 'react'
import type { MappRenderProps, MappUtils } from 'mapp'
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
}

type Utils = $PropertyType<MappRenderProps, 'utils'>

export type ProviderProps = Utils & {
	mapUid: string | null,
	viewer?: ViewerType,
	setMap: (string) => void,
	mapData?: MapType,
	transition: (string, ?{}) => void,
	createPin: Mutation,
	subscribeToMore: (SubscriptionConfig) => () => void,
	machineState: MachineState,
}

const defaults = {
	mapUid: null,
	viewer: undefined,
	mapData: undefined,
	setMap: () => {},
	createPin: async () => {},
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
	}

	componentDidMount() {
		this.updateOptions()
	}

	getEditorUtils = () => ({
		setMap: this.setMap,
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

	render() {
		const { children, utils, transition, machineState, inspectedItem } = this.props
		const { mapUid } = this.state
		const value = {
			inspectedItem,
			transition,
			machineState,
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
