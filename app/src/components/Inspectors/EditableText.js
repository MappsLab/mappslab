// @flow
import * as React from 'react'
import { Header1, Header2, Header3, Header4, Header5, P, TextArea, Input } from 'Components/Text'

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
	textSize: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p',
	viewerCanEdit: boolean,
	updateFn: ({ [key: string]: any }) => Promise<void>,
	name: string,
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
		placeholder: 'Untitled',
		updateVariables: {},
		multiline: false,
	}

	inputRef = React.createRef()

	state = {
		value: this.props.initialValue || '',
		rows: 1,
	}

	componentWillUnmount() {
		this.submitChange()
	}

	handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		const { value } = e.target
		this.setState(({ rows }) => {
			const { multiline } = this.props
			const inputRef = this.inputRef ? this.inputRef.current : undefined
			const newRows = multiline && inputRef ? Math.max(0, Math.floor(inputRef.scrollHeight / 18)) : rows
			return { value, rows: newRows }
		})
	}

	submitChange = () => {
		const { updateFn, name } = this.props
		const { value } = this.state
		updateFn({ [name]: value })
	}

	render() {
		const { viewerCanEdit, textSize, placeholder, multiline, autoFocus } = this.props
		const { value, rows } = this.state
		const Text = textComponentsMap[textSize] || textComponentsMap.p
		return viewerCanEdit ? (
			<Text
				onBlur={this.submitChange}
				as={multiline ? TextArea : Input}
				autoFocus
				onChange={this.handleChange}
				value={value}
				rows={multiline ? rows : undefined}
				ref={this.inputRef}
				placeholder={placeholder}
			/>
		) : (
			<Text>{value}</Text>
		)
	}
}

export default EditableText
