import * as React from 'react'
import styled from 'styled-components'
import { Header5 } from '../../../../components/Text'
import { Dot } from './Dot'

interface OptionProps {
	onClick: () => void | Promise<void>
	enabled: boolean
	label: string
}

export const Option = ({ onClick, enabled, label }: OptionProps) => {
	return (
		<LayerButton onClick={onClick}>
			<Dot enabled={enabled} />
			<Header5 color={enabled ? 'gray' : 'middleGray'}>{label}</Header5>
		</LayerButton>
	)
}

const LayerButton = styled.button`
	display: flex;
	justify-content: flex-start;
	align-items: flex-center;
	margin: 2px 0;
`
