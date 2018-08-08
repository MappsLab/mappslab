// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import type { LatLng, Map, Marker, OverlayView } from '../../types'
import { MapConsumer } from '../../Mapp'
import type { MapContextType as MapContext } from '../../Mapp'
import createPopup from './PopupClass'

/**
 * CustomPopup
 */

type Props = {
	position?: LatLng,
	anchor?: Marker,
	children: React.Node,
	map: Map,
}

type State = {
	ready: boolean,
}

class CustomPopup extends React.Component<Props, State> {
	element = React.createRef()

	entity: null | OverlayView = null

	listeners: Array<Object> = []

	container: HTMLElement = document.createElement('div')

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

	state = {
		ready: true,
	}

	componentWillMount() {
		this.container = document.createElement('div')
	}

	componentDidMount() {
		const { map, anchor } = this.props
		const Popup = createPopup()
		// $FlowFixMe
		this.entity = new Popup(anchor.position, this.container)
		this.entity.setMap(map)
		this.setState({ ready: true })
	}

	componentWillReceiveProps() {
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
		this.entity = null
	}

	render() {
		const { children } = this.props
		const { ready } = this.state
		return !ready ? null : ReactDOM.createPortal(React.Children.only(children), this.container)
		// <div ref={this.element}>{this.props.children}</div>
	}
}

type BaseProps = {}

const CustomPopupWithContext = (props: BaseProps): React.Node => (
	<MapConsumer>
		{// $FlowFixMe
		(mapContext: MapContext) => <CustomPopup {...mapContext} {...props} />}
	</MapConsumer>
)

export default CustomPopupWithContext
