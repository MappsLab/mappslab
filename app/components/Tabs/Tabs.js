// @flow
import * as React from 'react'
import TabMenu from './TabMenu'
import TabContent from './TabContent'

const TabContext = React.createContext()
const TabProvider = TabContext.Provider
export const TabConsumer = TabContext.Consumer

/**
 * MyComponent
 */

type Props = {
	initialTab?: null | string,
	children: React.Node,
}

type Tab = {
	name: string,
	displayName?: string,
}

type State = {
	activeTab: null | Tab,
	tabs: Array<Tab>,
}

export type TabContextValue = {
	activeTab: null | Tab,
	tabs: Array<Tab>,
	registerTab: (Tab) => void,
	removeTab: (Tab) => void,
	changeTab: (Tab) => () => void,
}

class Tabs extends React.Component<Props, State> {
	static defaultProps = {
		initialTab: null,
	}

	static Menu = TabMenu

	static Tab = TabContent

	state = {
		activeTab: null,
		tabs: [],
	}

	registerTab = (newTab: Tab) => {
		const { initialTab } = this.props
		this.setState(({ tabs, activeTab }) => {
			if (tabs.find((t) => t.name === newTab.name)) {
				throw new Error(`${newTab.name} is not valid: all tab names must be unique`)
			}
			const newActiveTab = !activeTab && newTab.name === initialTab ? newTab : activeTab
			return {
				tabs: [...tabs, newTab],
				activeTab: newActiveTab,
			}
		})
	}

	removeTab = (tab: Tab) => {
		this.setState(({ tabs, activeTab }) => {
			const tabIndex = tabs.findIndex((t) => t.name === tab.name)
			// If the tab to be removed is the active tab, set the new activeTab to the tab that is before
			// it, or, if it is the first tab, set the remaining first tab as active
			const newActiveTab = activeTab === tab.name ? tabs[Math.max(0, tabIndex - 1)] : activeTab
			return {
				tabs: [...tabs.slice(0, tabIndex), ...tabs.slice(tabIndex + 1)],
				activeTab: newActiveTab,
			}
		})
	}

	changeTab = (activeTab: Tab) => () => {
		this.setState({ activeTab })
	}

	render() {
		const { children } = this.props
		const { activeTab, tabs } = this.state
		const value = {
			activeTab,
			tabs,
			changeTab: this.changeTab,
			registerTab: this.registerTab,
			removeTab: this.removeTab,
		}
		return <TabProvider value={value}>{children}</TabProvider>
	}
}

export default Tabs
