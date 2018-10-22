// @flow
import React from 'react'
import { Marker, CustomPopup } from 'mapp'
import type { PinType } from 'Types'
import { MapConsumer } from '../Provider'
import type { ProviderProps } from '../Provider'

/**
 * Pin
 */

type BaseProps = {
	pin: PinType,
}

type Props = BaseProps & ProviderProps

type State = {
	// ...
}

class Pin extends React.Component<Props, State> {
	static defaultProps = {
		viewer: null,
	}

	componentDidMount() {}
	// state: {}

	render() {
		const { pin } = this.props
		const { lat, lng } = pin
		const options = {
			position: {
				lat,
				lng,
			},
		}
		return <Marker options={options} />
	}
}

/**
 * Wrapper
 */

const Wrapper = ({ pin }: BaseProps) => (
	<MapConsumer>
		{(contextValue) => (
			//
			<Pin pin={pin} {...contextValue} />
		)}
	</MapConsumer>
)

export default Wrapper
