// @flow
import React from 'react'
import type { ViewerType } from 'App/types'
/**
 * Dashboard
 */

type Props = {
	viewer: ViewerType,
}

class Dashboard extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	constructor(props) {
		super(props)
	}

	render() {
		return <div>Dashboard Component</div>
	}
}

export default Dashboard
