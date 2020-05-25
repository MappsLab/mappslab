import * as React from 'react'
import NativeListener from 'react-native-listener'
import { Wrapper, StyledInput } from './styled'
import {
	Header1,
	Header2,
	Header3,
	Header4,
	Header5,
	P,
	TextArea,
} from '../Text'

const { useEffect, useState, useRef } = React

interface EditableTextProps {
	fontSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p'
	viewerCanEdit?: boolean
	updateFn?: (value: { [key: string]: any }) => Promise<void>
	name: string
	autoFocus?: boolean
	initialValue?: string
	placeholder?: string
	multiline?: boolean
}
const textComponentsMap = {
	h1: Header1,
	h2: Header2,
	h3: Header3,
	h4: Header4,
	h5: Header5,
	p: P,
}

export const EditableText = ({
	fontSize,
	viewerCanEdit,
	updateFn,
	name,
	autoFocus,
	initialValue,
	placeholder,
	multiline,
}: EditableTextProps) => {
	const [focused, setFocused] = useState(autoFocus || false)
	const [value, setValue] = useState(initialValue || '')
	const inputRef = useRef<HTMLInputElement | null>(null)

	const focus = () => setFocused(true)
	const blur = () => setFocused(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const autoSize = () => {
		const field = inputRef.current
		if (!multiline || !field) return
		// Reset field height
		field.style.height = '0px'
		// Get the computed styles for the element
		const computed = window.getComputedStyle(field)
		// Calculate the height
		const height =
			parseInt(computed.getPropertyValue('border-top-width'), 10) +
			parseInt(computed.getPropertyValue('padding-top'), 10) +
			field.scrollHeight +
			parseInt(computed.getPropertyValue('padding-bottom'), 10) +
			parseInt(computed.getPropertyValue('border-bottom-width'), 10)
		field.style.height = `${height}px`
	}

	const submitChange = () => {
		if (updateFn && value) updateFn({ [name]: value })
	}

	// auto-size on mount
	useEffect(autoSize, [])

	// auto-submit on unmount
	useEffect(() => submitChange(), [])

	if (!viewerCanEdit) {
		const Text = textComponentsMap[fontSize || 'p'] || textComponentsMap.p
		return <Text>{value}</Text>
	}

	return (
		<Wrapper focused={focused}>
			<NativeListener onClick={focus}>
				<StyledInput
					onBlur={blur}
					fontSize={fontSize}
					as={multiline ? TextArea : undefined}
					autoFocus={autoFocus}
					onChange={handleChange}
					value={value}
					ref={inputRef}
					placeholder={placeholder}
				/>
			</NativeListener>
		</Wrapper>
	)
}
