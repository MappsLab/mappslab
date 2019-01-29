// @flow
import React from 'react'
import { mapEventNames } from 'mapp'
import { State } from 'react-automata'
import type { Subscription } from 'Types/GraphQL'
import { startSubscription } from 'Queries/startSubscription'
import { pinAddedToMap, pinDeleted, pinUpdated } from 'Queries/Map/mapSubscriptions'
import { NotificationsConsumer } from 'Components/Notifications'
import type { NewNotification } from 'Components/Notifications'
import Pin from './Pin'
import Route from './Route'
import NewRoute from './Route/NewRoute'
import Tools from './Tools'
import { MapConsumer } from './Provider'
import type { ProviderProps } from './Provider'
import WelcomeDialog from './WelcomeDialog'
import MapNotifications from './MapNotifications'
import { getHandlersForState } from './mapEventHandlers'

export type EditorProps = ProviderProps & {
	mapUid: null | string,
	sendNotification: (NewNotification) => void,
}

const domEventNames = ['keyup']

class MapEditor extends React.Component<EditorProps> {
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
		this.addEventListeners()
	}

	componentWillUpdate(nextProps) {
		if (nextProps.mapUid && nextProps.mapUid !== this.props.mapUid) {
			this.props.setMap(nextProps.mapUid)
			this.stopSubscriptions()
			this.startSubscriptions()
		}
	}

	componentDidUpdate(prevProps) {
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
	handleEvent = (eventName: string) => (payload) => {
		const { machineState } = this.props
		const handlers = getHandlersForState(machineState.value)
		if (handlers[eventName]) handlers[eventName](payload, this.props)
	}

	domListeners: { [key: string]: { remove: () => void } }

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
		const { subscribeToMore, mapUid } = this.props
		if (!mapUid) this.stopSubscriptions()
		// const subscriptions = [pinAddedToMap, pinUpdated, pinDeleted]
		const subscriptions = [pinAddedToMap]

		this.subscriptions = subscriptions.map((s) =>
			startSubscription({
				subscribeToMore,
				variables: { mapUid },
				callback: this.logSubscriptionUpdate(s.name),
				...s,
			}),
		)
	}

	logSubscriptionUpdate = (previous, updated) => {
		console.log(previous, updated)
	}

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
		const { pins, routes } = mapData
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
		const { mapData, transition } = this.props
		if (!mapData) return null
		return (
			<React.Fragment>
				<State is="Welcome">
					<WelcomeDialog map={mapData} transition={transition} />
				</State>
				<Tools {...this.props} />
				<MapNotifications />
				{this.renderMapData()}
			</React.Fragment>
		)
	}
}

/**
 * Wrapper
 */

type WrapperProps = {
	mapUid?: null | string,
}

const Wrapper = ({ mapUid }: WrapperProps) => (
	<NotificationsConsumer>
		{({ sendNotification }) => (
			<MapConsumer>
				{(contextValue) => <MapEditor mapUid={mapUid || null} sendNotification={sendNotification} {...contextValue} />}
			</MapConsumer>
		)}
	</NotificationsConsumer>
)

Wrapper.defaultProps = {
	mapUid: null,
}

export default Wrapper
