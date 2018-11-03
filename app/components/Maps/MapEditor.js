// @flow
import React from 'react'
import { mapEventNames } from 'mapp'
import { State } from 'react-automata'
import type { Subscription } from 'Types/GraphQL'
import { startSubscription } from 'Queries/startSubscription'
import { pinAddedToMap, pinDeleted, pinUpdated } from 'Queries/Map/mapSubscriptions'
import Pin from './Pin'
import Tools from './Tools'
// import withEditorModes from './editorModes'
import { MapConsumer } from './Provider'
import type { ProviderProps } from './Provider'
import WelcomeDialog from './WelcomeDialog'
import { getHandlersForState } from './mapEventHandlers'

// const debug = require('debug')('app')

type EditorProps = ProviderProps & {
	mapUid: null | string,
}

class MapEditor extends React.Component<EditorProps> {
	static defaultProps = {
		viewer: null,
		mapData: null,
	}

	listeners: {} = {}

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

	addEventListeners() {
		const { addEventListeners } = this.props
		this.listeners = mapEventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)
		addEventListeners(this.listeners)
	}

	removeEventListeners() {
		const { removeEventListeners } = this.props
		removeEventListeners(this.listeners)
		this.listeners = {}
	}

	startSubscriptions() {
		const { subscribeToMore, mapUid } = this.props
		if (!mapUid) this.stopSubscriptions()
		// const subscriptions = [pinAddedToMap, pinDeleted, pinUpdated]
		const subscriptions = [pinAddedToMap, pinUpdated, pinDeleted]

		this.subscriptions = subscriptions.map((s) =>
			startSubscription({
				subscribeToMore,
				variables: { mapUid },
				// callback: this.logSubscriptionUpdate(s.name),
				...s,
			}),
		)
	}

	subscriptions: Array<Subscription>

	stopSubscriptions() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe()
		})
		this.subscriptions = []
	}

	renderMapData() {
		const { mapData } = this.props
		if (!mapData) return null
		const { pins } = mapData
		return <React.Fragment>{pins && pins.map((p) => <Pin key={p.uid} pin={p} />)}</React.Fragment>
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
	<MapConsumer>{(contextValue) => <MapEditor mapUid={mapUid || null} {...contextValue} />}</MapConsumer>
)

Wrapper.defaultProps = {
	mapUid: null,
}

export default Wrapper
