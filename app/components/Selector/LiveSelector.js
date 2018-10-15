// @flow
import * as React from 'react'
import Selector from './Selector'
import type { SelectorItem } from './Selector'

type Props = {
	onSelect: () => void,
	refetchQuery: (string) => void,
	refetchDelay?: number,
	items: Array<SelectorItem>,
}

type State = {
	value: string,
}

class LiveSelector extends React.Component<Props, State> {
	static defaultProps = {
		refetchDelay: 300,
	}

	onInputValueChange = (value: string) => {
		const { refetchQuery, refetchDelay } = this.props
		clearTimeout(this.refetchTimeout)
		this.refetchTimeout = setTimeout(() => refetchQuery(value), refetchDelay)
	}

	refetchTimeout: TimeoutID

	render() {
		const { onSelect, items } = this.props
		return (
			<Selector label="Select your classroom" onInputValueChange={this.onInputValueChange} onChange={onSelect} items={items} />
		)
	}
}

export default LiveSelector
