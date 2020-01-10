// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import type { LatLng, Map, Marker, OverlayView } from '../../types'
import { MappConsumer } from '../../Mapp'
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
		if (!props.position && !props.anchor)
			throw new Error(
				'CustomPopup must have either a `anchor` or `position` prop',
			)
		if (props.position && props.anchor)
			throw new Error(
				'CustomPopup must have either a `anchor` or `position` prop, not both',
			)
	}

	state = {
		ready: true,
	}

	componentWillMount() {
		this.container = document.createElement('div')
	}

	componentDidMount() {
		const { map, position } = this.props
		const Popup = createPopup()
		// $FlowFixMe
		this.entity = new Popup(position, this.container)
		this.entity.setMap(map)
		this.setState({ ready: true })
	}

	componentWillReceiveProps(nextProps: Props) {
		const { position } = nextProps
		if (this.entity) this.entity.setPosition(position)
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		this.entity = null
	}

	render() {
		const { children } = this.props
		const { ready } = this.state
		return !ready
			? null
			: ReactDOM.createPortal(React.Children.only(children), this.container)
	}
}

type BaseProps = {}

const CustomPopupWithContext = (props: BaseProps): React.Node => (
	<MappConsumer>
		{// $FlowFixMe
		(mapContext: MapContext) => <CustomPopup {...mapContext} {...props} />}
	</MappConsumer>
)

export default CustomPopupWithContext
