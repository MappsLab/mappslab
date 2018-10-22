// @flow
import React from 'react'
import { mapEventNames } from 'mapp/eventNames'
// import type { MappRenderProps, MappUtils } from 'mapp/types'
// import type { MapType, ViewerType } from 'Types'
// import type { Map as GoogleMap } from 'mapp/types'
// import { pinAddedToMap, pinDeleted, pinUpdated } from 'Queries/Map/mapSubscriptions'
// import { startSubscription } from 'Queries/startSubscription'
// import { withStateMachine } from 'react-automata'
// import { compose, getStateString } from 'Utils/data'
// import Debugger from './Debugger'
import Pin from './Pin'
import Tools from './Tools'
// import withEditorModes from './editorModes'
import { MapConsumer } from './Provider'
import type { ProviderProps } from './Provider'

// const debug = require('debug')('app')

type Props = ProviderProps & {
	mapUid: string,
}

class MapEditor extends React.Component<Props> {
	static defaultProps = {
		viewer: null,
		mapData: null,
	}

	listeners: {} = {}

	componentDidMount() {
		const { mapUid, setMap } = this.props
		if (mapUid) setMap(mapUid)
		this.addEventListeners()
	}

	componentWillUpdate(nextProps) {
		if (nextProps.mapUid !== this.props.mapUid) {
			this.props.setMap(nextProps.mapUid)
		}
	}

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 * See ./modes for the handlers for each mode.
	 */
	handleEvent = (eventName: Event) => (payload) => {
		if (false) console.log(eventName, payload)
		// const mode = this.getMode()
		// const modePath = mode.split('.')
		// const handler = R.path(['props', 'modes', ...modePath, eventName])(this)
		// debug(`[event]: ${eventName}, ${mode}, ${Boolean(handler).toString()}`)
		// if (handler) handler(this.props)(payload)
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

	renderMapData() {
		const { mapData } = this.props
		if (!mapData) return null
		const { pins } = mapData
		return (
			<React.Fragment>
				{pins.map((p) => (
					<Pin key={p.uid} pin={p} />
				))}
			</React.Fragment>
		)
	}

	render() {
		return (
			<React.Fragment>
				{this.renderMapData()}
				<Tools {...this.props} />
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
	<MapConsumer>
		{(contextValue) => (
			//
			<MapEditor mapUid={mapUid} {...contextValue} />
		)}
	</MapConsumer>
)

Wrapper.defaultProps = {
	mapUid: null,
}

export default Wrapper
