import * as React from 'react'
import styled, { css } from 'styled-components'
import { State } from 'react-automata'
import { states as statesList } from './statechart'

const states = Object.keys(statesList)

const Wrapper = styled.div`
	position: absolute;
	top: 10px;
	left: 10px;
	background: white;
	width: 200px;
	z-index: 100;
	padding: 5px;
`

const PropertyWrapper = styled.div`
	& + & {
		margin-top: 5px;
	}
`

const LogWrapper = styled.div`
	margin-top: 10px;
`

interface ValueProps {
	isBoolean?: boolean
}

const Value = styled.h4`
	${({ isBoolean }: ValueProps) => css`
		color: ${isBoolean ? 'tomato' : 'auto'};
		display: inline;
	`}
`

const Title = styled.h4`
	font-weight: 800;
	display: inline;

	& ${Value} {
		display: inline;
	}
`

const Log = styled.div`
	margin-top: 4px;
	overflow: hidden;
	background-color: rgba(245, 245, 245);
	padding: 5px;
	max-height: 130px;
	overflow-y: scroll;
`

const LogLine = styled.h4`
	word-wrap: none;
`
interface PropertyProps {
	title: string
	value: boolean | string
}

const Property = ({ title, value }: PropertyProps) => (
	<PropertyWrapper>
		<Title>{title}:</Title>{' '}
		<Value isBoolean={typeof value === 'boolean'}>{value.toString()}</Value>
	</PropertyWrapper>
)

/**
 * Debugger
 */

type Props = {
	log: Array<{ timestamp: Date; message: string }>
}

export const Debugger = ({ log }: Props) => (
	<Wrapper>
		{states.map((state) => (
			<State is={state} key={state}>
				<Property title="mode" value={state} />
			</State>
		))}
		<hr />
		<LogWrapper>
			<Title>Log</Title>
			<Log>
				{log.reverse().map((l) => (
					<LogLine key={l.timestamp.getTime()}>{l.message}</LogLine>
				))}
			</Log>
		</LogWrapper>
	</Wrapper>
)

Debugger.defaultProps = {
	mode: '',
}
