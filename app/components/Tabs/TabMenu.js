// @flow
import React from 'react'
import styled from 'styled-components'
import { TabConsumer } from './Tabs'
import type { TabContextValue } from './Tabs'

const TabButton = styled.button`
	${({ theme, active }) => `
		font-size: ${theme.text.h3};
		border-bottom: 2px solid ${active ? 'black' : 'transparent'};
	`};
`

/**
 * TabMenu
 */

const TabMenu = () => (
	<TabConsumer>
		{({ tabs, changeTab, activeTab }: TabContextValue) => {
			if (!tabs) return null
			return tabs.map(({ name, displayName }) => (
				<TabButton key={name} active={name === activeTab} onClick={changeTab({ name })}>
					{displayName || name}
				</TabButton>
			))
		}}
	</TabConsumer>
)

export default TabMenu
