// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header1, Header2, Header3, Header4, Header5, P, TextArea, Input } from 'Components/Text'

const Label = styled(Header5)`
	${({ theme }) => `
		color: ${theme.color.middleGray};
`}
`

const textComponentsMap = {
	h1: Header1,
	h2: Header2,
	h3: Header3,
	h4: Header4,
	h5: Header5,
	p: P,
}

/**
 * EditableText
 */

type Props = {
	label?: string,
	textSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p',
	viewerCanEdit?: boolean,
	updateFn?: ({ [key: string]: any }) => Promise<void>,
	name: string,
	autoFocus?: boolean,
	initialValue?: string,
	placeholder?: string,
	multiline?: boolean,
}

type State = {
	value: string,
	rows: number,
}

class EditableText extends React.Component<Props, State> {
	static defaultProps = {
		initialValue: '',
		textSize: 'p',
		placeholder: 'Untitled',
		label: undefined,
		updateFn: undefined,
		viewerCanEdit: false,
		updateVariables: {},
		autoFocus: true,
		multiline: false,
	}

	inputRef = React.createRef()

	state = {
		value: this.props.initialValue || '',
		rows: 1,
	}

	componentDidMount() {
		const { value } = this.state
		this.handleChange({ target: { value } })
	}

	componentWillUnmount() {
		this.submitChange()
		// const inputRef = this.inputRef ? this.inputRef.current : undefined
	}

	handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		const { value } = e.target
		this.setState(({ rows }) => {
			const { multiline } = this.props
			const inputRef = this.inputRef ? this.inputRef.current : undefined
			const newRows = multiline && inputRef ? Math.max(0, Math.floor(inputRef.scrollHeight / 14)) : rows
			const height = multiline && inputRef ? inputRef.scrollHeight : 'auto'
			console.log(newRows, height)
			return { value, rows: newRows }
		})
	}

	submitChange = () => {
		const { updateFn, name } = this.props
		const { value } = this.state
		if (updateFn) updateFn({ [name]: value })
	}

	render() {
		const { viewerCanEdit, textSize, placeholder, multiline, label, autoFocus } = this.props
		const { value, rows, height } = this.state
		const Text = textComponentsMap[textSize || 'p'] || textComponentsMap.p
		return viewerCanEdit ? (
			<React.Fragment>
				{label && <Label>{label}</Label>}
				<Text
					onBlur={this.submitChange}
					as={multiline ? TextArea : Input}
					autoFocus={autoFocus}
					onChange={this.handleChange}
					value={value}
					// style={{ minHeight: `${height}px` }}
					// rows={multiline ? rows : undefined}
					ref={this.inputRef}
					placeholder={placeholder}
				/>
			</React.Fragment>
		) : (
			<React.Fragment>
				<Label>{label}</Label>

				<Text>{value}</Text>
			</React.Fragment>
		)
	}
}

export default EditableText
