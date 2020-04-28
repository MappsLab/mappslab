import * as React from 'react'
import { Selector, SelectorItem } from './Selector'

const { useState, useEffect } = React

interface LiveSelectorProps {
	disabled?: boolean
	label: string
	onSelect: ({ value: string }) => void
	refetchQuery: (value: string) => void
	refetchDelay?: number
	items: Array<SelectorItem>
}

export const LiveSelector = (props: LiveSelectorProps) => {
	const { refetchQuery, refetchDelay, onSelect, items, disabled, label } = props
	const [inputValue, setInputValue] = useState('')

	const onInputValueChange = (value: string) => {
		const { refetchQuery, refetchDelay } = this.props
		clearTimeout(this.refetchTimeout)
		this.refetchTimeout = setTimeout(() => refetchQuery(value), refetchDelay)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			refetchQuery(inputValue)
		}, refetchDelay)
		return () => clearTimeout(timeout)
	}, [inputValue])

	return (
		<Selector
			label={label}
			onInputValueChange={onInputValueChange}
			onChange={onSelect}
			items={items}
			disabled={disabled}
		/>
	)
}
