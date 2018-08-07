// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { addListeners, removeListeners } from '../../utils/listeners'
import type { LatLng, Map, Marker, InfoWindow as InfoWindowType } from '../../types'
import { MapConsumer } from '../../Mapp'
import createPopup from './PopupClass'

/**
 * CustomPopup
 */

const infoWindowEventNames = {}

type Props = {
	position?: LatLng,
	anchor?: Marker,
	children: React.Node,
	map: Map,
	visible?: boolean,
}

type State = {
	// ...
}

class CustomPopup extends React.Component<Props, State> {
	element = React.createRef()

	entity: null | any = null

	listeners: Array<Object> = []

	container: null | HTMLElement = null

	static defaultProps = {
		position: null,
		anchor: null,
		visible: false,
	}

	constructor(props: Props) {
		super(props)
		if (!props.position && !props.anchor) throw new Error('CustomPopup must have either a `anchor` or `position` prop')
		if (props.position && props.anchor) throw new Error('CustomPopup must have either a `anchor` or `position` prop, not both')
	}

	componentWillMount() {
		this.container = document.createElement('div')
	}

	componentDidMount() {
		const { map, anchor, ...props } = this.props
		const Popup = createPopup()
		this.entity = new Popup(anchor.position, this.container)

		this.entity.setMap(map)
	}

	componentWillReceiveProps(nextProps: Props) {
		// if (this.entity === null) return
		// const newProps = getNewValues(this.props, nextProps)
		// if (newProps) {
		// 	const { options, events } = separateOptionsAndEvents(newProps, infoWindowEventNames)
		// 	if (options) this.entity.setOptions(options)
		// 	if (events) addListeners(this.entity, infoWindowEventNames, events)
		// }
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		removeListeners(this.listeners)
		this.entity = null
	}

	render() {
		return ReactDOM.createPortal(React.Children.only(this.props.children), this.container)
		// <div ref={this.element}>{this.props.children}</div>
	}
}

type BaseProps = {}

const CustomPopupWithContext = (props: BaseProps): React.Node => (
	<MapConsumer>{(mapContext: MapContext) => <CustomPopup {...mapContext} {...props} />}</MapConsumer>
)

export default CustomPopupWithContext
