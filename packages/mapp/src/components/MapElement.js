// @flow
import React from 'react'

import MarkerProps from './Marker'

/**
 * MapElement
 */

type Props = {
	type: 'marker',
	data: MarkerProps,
}

type State = {
	// ...
}

class MapElement extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	constructor(props) {
		super(props)
	}

	render() {
		return <div>MapElement Component</div>
	}
}

export default MapElement
