import * as React from 'react'
import { MappRenderProps, LatLng } from 'mapp'
import { withStateMachine, MachineState } from 'react-automata'
import { MapQuery } from '../../queries'
import CreatePinMutation from '../../queries/Pin/createPinMutation'
import { CurrentViewerConsumer } from '../../providers/CurrentViewer'
import { Pin, Map, Route, Viewer, Mutation, SubscriptionConfig } from '../../types-ts'
import { getOptionsForState } from './mapOptions'
import statechart from './statechart'

const debug = require('debug')('app')

/**
 * Provider
 */

export type View = 'normal' | 'street'

type Props = MappRenderProps & {
	initialView?: View
	initialMapUid?: string | null
	children: React.ReactNode
	inspectedItem?: Pin | Route
}

type State = {
	mapUid: string | null
	userLatLng: LatLng | null
}

type Utils = Pick<MappRenderProps, 'utils'>

export type ProviderProps = Utils & {
	mapUid: string | null
	viewer?: Viewer
	setMap: (id: string) => void
	mapData?: Map
	transition: (string, {}) => void
	updateMapState: (string: string, state: Partial<State>) => void
	createPin: Mutation
	connectToPin?: {
		pin: Pin
		position?: 'BEFORE' | 'AFTER'
	}
	userLatLng?: LatLng
	subscribeToMore: (SubscriptionConfig) => () => void
	machineState: MachineState
	panTo: (ll: LatLng) => void
	fitBounds: (bounds: any) => void

	addEventListeners: (listeners: { [key: string]: (args: any) => void }) => void
	removeEventListeners: (listeners: { [key: string]: (args: any) => void }) => void
	setBaseImage: (s: string) => void
}

// const defaults = {
// 	mapUid: null,
// 	viewer: undefined,
// 	mapData: undefined,
// 	setMap: () => {},
// 	createPin: async () => {},
// 	updateMapState: () => {},
// 	transition: () => {},
// 	subscribeToMore: () => () => {},
// 	machineState: 'none',
// }

const { Provider, Consumer } = React.createContext<ProviderProps | undefined>(undefined)
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
					<CurrentViewerConsumer>
						{({ viewer }) => {
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
					</CurrentViewerConsumer>
				)}
			</CreatePinMutation>
		)
	}
}

export const MapProvider = withStateMachine(statechart)(MapProviderClass)
