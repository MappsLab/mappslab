import * as React from 'react'
import { Selector, SelectorItemType } from './Selector'

const { useState, useEffect } = React

interface LiveSelectorProps {
	disabled?: boolean
	label: string
	onSelect: ({ value: string }) => void
	refetchQuery: (value: string) => void
	refetchDelay?: number
	items: SelectorItemType[]
}

export const LiveSelector = (props: LiveSelectorProps) => {
	const { refetchQuery, refetchDelay, onSelect, items, disabled, label } = props
	const [inputValue, setInputValue] = useState('')

	const onInputValueChange = (value: string) => {
		setInputValue(value)
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
