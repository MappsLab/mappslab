import React from 'react'
import { path } from 'ramda'
import { mapEventNames } from 'mapp'
import { unwindEdges } from '@good-idea/unwind-edges'
import { State } from 'react-automata'
import { Subscription } from 'Types'
import { $PropertyType } from 'utility-types'
import { startSubscription } from 'Queries/startSubscription'
import { pinAddedToMap, pinDeleted, pinUpdated, mapUpdated } from 'Queries/Map/mapSubscriptions'
import { NewNotification, NotificationsConsumer } from 'Components/Notifications'
import { eventsReducer, isFunc } from 'Utils/data'
import { getMapBounds } from 'Utils/maps'
import { InspectorProvider, ItemInspector, InspectorConsumer } from './ItemInspector'
import { ItemInspectorProviderProps } from './ItemInspector'
import Pin from './Pin'
import { Route } from './Route'
import NewRoute from './Route/NewRoute'
import Tools from './Tools'
import NotLoggedIn from './NotLoggedIn'
import { ProviderProps, MapConsumer } from './Provider'
import WelcomeDialog from './WelcomeDialog'
import MapNavigation from './MapNavigation'
import MapNotifications from './MapNotifications'
import { mapEvents } from './mapEventHandlers'
import config from '../../config'

export type EditorProps = ProviderProps & {
	mapUid: null | string
	sendNotification: (n: NewNotification) => void
	closeInspector: $PropertyType<ItemInspectorProviderProps, 'closeInspector'>
	inspectItem: $PropertyType<ItemInspectorProviderProps, 'inspectItem'>
	setBaseImage: (args: any) => void
}

const domEventNames = ['keyup']

class MapEditorMain extends React.Component<EditorProps> {
	static defaultProps = {
		viewer: null,
		mapData: null,
		connectToPin: null,
	}

	mapListeners: {} = {}

	componentDidMount() {
		const { mapUid, setMap } = this.props
		if (mapUid) {
			setMap(mapUid)
			this.startSubscriptions()
		}
		if (this.props.mapData && this.props.mapData.pins && this.props.mapData.pins.edges.length > 0) {
			const [pins] = unwindEdges(this.props.mapData.pins)
			const bounds = getMapBounds(pins)
			this.props.fitBounds(bounds)
			/* Set a max zoom */
			console.log(this.props)
			const imageMaxZoom = this.props.mapData.baseImage ? this.props.mapData.baseImage.tileset.maxZoom : undefined
			const currentZoom = this.props.getZoom()
			this.props.setZoom(Math.min(currentZoom, imageMaxZoom || 10))
		}
		this.setBaseImage()
		this.addEventListeners()
	}

	componentWillReceiveProps(nextProps: EditorProps) {
		const tileset = path(['mapData', 'baseImage', 'tileset'], nextProps)
		if (tileset) this.setBaseImage(nextProps)
	}

	setBaseImage({ setBaseImage, mapData, setZoom }: EditorProps = this.props) {
		if (!(mapData && mapData.baseImage && mapData.baseImage.tileset)) return
		const { baseUri, maxZoom } = mapData.baseImage.tileset

		function getNormalizedCoord(coord, zoom) {
			var y = coord.y
			var x = coord.x

			// tile range in one direction range is dependent on zoom level
			// 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
			var tileRange = 1 << zoom

			// don't repeat across y-axis (vertically)
			if (y < 0 || y >= tileRange) {
				return null
			}

			// repeat across x-axis
			if (x < 0 || x >= tileRange) {
				x = ((x % tileRange) + tileRange) % tileRange
			}

			return { x: x, y: y }
		}

		const getTileUrl = (coord, zoom) => {
			const normalized = getNormalizedCoord(coord, zoom)
			if (!normalized) return null
			const { x, y } = normalized
			const url = `${config.imageBucketRoot}${baseUri}/${zoom}/${x}/${y}.png`
			if (zoom > 4) return null
			return url
		}
		setBaseImage({ getTileUrl, maxZoom })
	}

	componentWillUpdate(nextProps: EditorProps) {
		if (nextProps.mapUid && nextProps.mapUid !== this.props.mapUid) {
			this.props.setMap(nextProps.mapUid)
			this.stopSubscriptions()
			this.startSubscriptions()
		}
	}

	componentDidUpdate(prevProps: EditorProps) {
		if (prevProps.machineState.value !== this.props.machineState.value) {
			this.handleEvent('onEntry')()
		}
	}

	componentWillUnmount() {
		this.removeEventListeners()
		this.stopSubscriptions()
	}

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 */
	handleEvent = (eventName: string) => (payload?: any) => {
		const { machineState } = this.props
		const handler = eventsReducer(mapEvents, machineState.value, eventName)
		if (handler) {
			const result = handler({ payload, props: this.props })
			const { state, actions } = result
			if (actions) {
				Object.keys(actions).forEach((key) => {
					const action = actions[key]
					if (isFunc(action)) action()
				})
			}
			if (state) this.setState(state)
		}
	}

	// logSubscriptionUpdate = (previous, updated) => {
	// 	// console.log(previous, updated)
	// }

	addEventListeners() {
		const { addEventListeners } = this.props
		this.mapListeners = mapEventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)
		this.domListeners = domEventNames.reduce((acc, name) => {
			const handler = this.handleEvent(name)
			window.addEventListener(name, handler)
			const listener = {
				remove: () => window.removeEventListener(name, handler),
			}
			return {
				...acc,
				[name]: listener,
			}
		}, {})

		addEventListeners(this.mapListeners)
	}

	removeEventListeners() {
		const { removeEventListeners } = this.props
		removeEventListeners(this.mapListeners)
		this.mapListeners = {}
		// $FlowFixMe
		Object.values(this.domListeners).forEach((l) => l.remove && l.remove())
	}

	startSubscriptions() {
		const { subscribeToMore, mapUid, refetch } = this.props
		if (!mapUid) this.stopSubscriptions()
		const subscriptions = [pinAddedToMap, pinUpdated, pinDeleted, mapUpdated]

		this.subscriptions = subscriptions
			.map((s) => (typeof s === 'function' ? s(this.props) : s))
			.map((s) =>
				startSubscription({
					subscribeToMore,
					refetch,
					variables: { mapUid },
					// callback: this.logSubscriptionUpdate(s.name),
					...s,
				}),
			)
	}

	domListeners: { [key: string]: { remove: () => void } }

	subscriptions: Array<Subscription>

	stopSubscriptions() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe()
		})
		this.subscriptions = []
	}

	renderMapData() {
		const { mapData, connectToPin, userLatLng } = this.props
		if (!mapData) return null
		const [pins] = unwindEdges(mapData.pins)
		const [routes] = unwindEdges(mapData.routes)
		return (
			<React.Fragment>
				{pins && pins.map((p) => <Pin key={p.uid} pin={p} />)}
				{routes && routes.map((r) => <Route key={r.uid} route={r} />)}
				{connectToPin && userLatLng && (
					<State is="Lesson.DropPin.DropMode.Connect">
						<NewRoute connectToPin={connectToPin} userLatLng={userLatLng} />
					</State>
				)}
			</React.Fragment>
		)
	}

	render() {
		const { mapData, transition, viewer } = this.props
		if (!mapData) return null
		return (
			<React.Fragment>
				<State is="Welcome">
					<WelcomeDialog map={mapData} transition={transition} />
				</State>
				<MapNavigation map={mapData} />
				{viewer ? <Tools {...this.props} /> : <NotLoggedIn />}
				<MapNotifications />
				<ItemInspector />
				{this.renderMapData()}
			</React.Fragment>
		)
	}
}

/**
 * Wrapper
 */

type WrapperProps = {
	mapUid?: null | string
}

export const MapEditor = ({ mapUid }: WrapperProps) => (
	<MapConsumer>
		{(contextValue) => (
			<InspectorProvider {...contextValue}>
				<InspectorConsumer>
					{({ closeInspector, inspectItem }) => (
						<NotificationsConsumer>
							{({ sendNotification }) => (
								<MapEditorMain
									closeInspector={closeInspector}
									inspectItem={inspectItem}
									mapUid={mapUid || null}
									sendNotification={sendNotification}
									{...contextValue}
								/>
							)}
						</NotificationsConsumer>
					)}
				</InspectorConsumer>
			</InspectorProvider>
		)}
	</MapConsumer>
)

MapEditor.defaultProps = {
	mapUid: null,
}