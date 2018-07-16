// @flow
import * as React from 'react'
import styled from 'styled-components'
import { State } from 'react-automata'
import { states } from './modes/statechart'

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

const Value = styled.h4`
	color: ${({ isBoolean }) => (isBoolean ? 'tomato' : 'auto')};
	display: inline;
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

const Property = ({ title, value }: { title: string, value: boolean | string }): React.Node => (
	<PropertyWrapper>
		<Title>{title}:</Title> <Value isBoolean={typeof value === 'boolean'}>{value.toString()}</Value>
	</PropertyWrapper>
)

/**
 * Debugger
 */

type Props = {
	log: Array<{ timestamp: date, message: string }>,
}

const Debugger = ({ log }: Props) => (
	<Wrapper>
		{states.map((state) => (
			<State value={state} key={state}>
				<Property title="mode" value={state} />
			</State>
		))}
		<hr />
		<LogWrapper>
			<Title>Log</Title>
			<Log>{log.reverse().map((l) => <LogLine key={l.timestamp}>{l.message}</LogLine>)}</Log>
		</LogWrapper>
	</Wrapper>
)

Debugger.defaultProps = {
	mode: '',
}

export default Debugger
