import * as React from 'react'
import { useCallback } from 'react'
import { debounce } from 'lodash'
import { CirclePicker, Color, ColorResult } from 'react-color'
import styled from 'styled-components'

const { useState } = React

interface EditableTextProps {
	viewerCanEdit?: boolean
	updateFn?: (value: { [key: string]: any }) => Promise<void>
	initialValue?: string | null
	name: string
}

const Wrapper = styled.div`
	margin: 12px;
`

export const EditableColor = ({
	viewerCanEdit,
	updateFn,
	initialValue,
	name,
}: EditableTextProps) => {
	if (!viewerCanEdit) return null

	const [value, setValue] = useState(initialValue)

	const submitChange = useCallback(
		debounce((newValue) => {
			if (updateFn && newValue) updateFn({ [name]: newValue })
		}, 300),
		[],
	)

	const handleChange = (color: ColorResult) => {
		setValue(color.hex)
		submitChange(color.hex)
	}

	return (
		<Wrapper>
			<CirclePicker color={value || undefined} onChange={handleChange} />
		</Wrapper>
	)
}
