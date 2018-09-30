// @flow
import * as React from 'react'
import { TabConsumer } from './Tabs'
import type { TabContextValue } from './Tabs'

/**
 * TabContent
 */

type BaseProps = {
	children: React.Node,
	displayName?: void | string,
	name: string,
}

type Props = BaseProps & TabContextValue

class TabContent extends React.Component<Props> {
	static defaultProps = {
		displayName: undefined,
	}

	componentDidMount() {
		const { registerTab, name, displayName } = this.props
		registerTab({ name, displayName })
	}

	componentWillUnmount() {
		const { removeTab, name } = this.props
		removeTab({ name })
	}

	render() {
		const { name, children, activeTab } = this.props
		return activeTab && name === activeTab.name ? children : null
	}
}

const Wrapper = (props: BaseProps) => <TabConsumer>{(contextValue) => <TabContent {...contextValue} {...props} />}</TabConsumer>

Wrapper.defaultProps = {
	displayName: undefined,
}

export default Wrapper
