// @flow
import React from 'react'
import type { ViewerType } from 'App/types'
import { withViewerDashboardQuery } from 'App/queries'
import { Main } from 'App/components/Layout'
import { Header1 } from 'App/components/Text'

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
		console.log(this.props.viewer)
		return null
		return (
			<Main>
				<Header1 align="left">Hi, {this.props.viewer.name}</Header1>
			</Main>
		)
	}
}

export default withViewerDashboardQuery(Dashboard)
