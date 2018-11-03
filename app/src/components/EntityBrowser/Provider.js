// @flow
import * as React from 'react'
import type { ClassroomType, UserType } from 'Types'

const defaultState = {
	current: null,
	history: [],
	close: () => {},
	navigateTo: () => {},
}
const Context = React.createContext(defaultState)
export const { Consumer } = Context

/**
 * EntityBrowser
 */

type Entity = ClassroomType | UserType

type Props = {
	children: React.Node,
}

type State = {
	current: null | Entity,
	history: Array<Entity>,
}

export type RenderProps = {
	current: null | Entity,
	history: Array<Entity>,
	navigateTo: (Entity) => void,
	close: () => void,
}

class Provider extends React.Component<Props, State> {
	state = {
		current: null,
		history: [],
	}

	navigateTo = (node: Entity) => {
		this.setState(({ current: previous, history }) => ({
			current: node,
			history: [...history, previous, node].filter(Boolean),
		}))
	}

	close = () => {
		this.setState({
			current: null,
			history: [],
		})
	}

	render() {
		const { children } = this.props
		const { current, history } = this.state

		const value = {
			navigateTo: this.navigateTo,
			close: this.close,
			current,
			history,
		}
		return <Context.Provider value={value}>{children}</Context.Provider>
	}
}

export default Provider
