// @flow
import * as React from 'react'
import type { ViewerType } from 'Types/User'
import { InspectorConsumer } from 'Components/Inspector'
import type { InspectItem } from 'Components/Inspector/InspectorProvider'
/**
 * Dashboard
 *
 * - simply launch the inspector
 */

type BaseProps = {
	viewer: ViewerType,
}

type Props = BaseProps & {
	inspectItem: InspectItem,
}

class Dashboard extends React.Component<Props> {
	componentDidMount() {
		const { viewer, inspectItem } = this.props
		inspectItem(viewer)
	}

	render() {
		return null
	}
}

export default (baseProps: BaseProps) => (
	<InspectorConsumer>{(inspectorProps) => <Dashboard {...baseProps} {...inspectorProps} />}</InspectorConsumer>
)
