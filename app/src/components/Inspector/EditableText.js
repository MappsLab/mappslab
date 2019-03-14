// @flow
import * as React from 'react'
import styled from 'styled-components'
import { FaPencilAlt } from 'react-icons/fa'
import NativeListener from 'react-native-listener'
import { Header1, Header2, Header3, Header4, Header5, P, TextArea, Input } from 'Components/Text'
import ToolTip from 'Components/ToolTip'

const StyledInput = styled(Input)`
	${({ theme, fontSize }) => `
		font-size: ${theme.font.size[fontSize] || theme.font.size.p};
		max-width: 100%;
		min-height: 1.3em;
		background-color: inherit;
		cursor: inherit;
		width: 100%;
	`}
`

const Wrapper = styled.div`
	${({ theme, focused }) => `
		margin-bottom: ${theme.layout.spacing.single};
		position: relative;
		background-color: ${focused ? `${theme.color.xLightGray}` : ''};
		cursor: ${focused ? 'initial' : 'pointer'};
		color: ${focused ? theme.color.primary.normal : 'inherit'};
		&:hover {
			background-color: ${theme.color.xLightGray};
		}
	`}
`

const IconWrapper = styled.div`
	${({ theme }) => `
		position: absolute;
		top: 3px;
		right: 3px;
		font-size: ${theme.font.size.h4};
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
	fontSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p',
	viewerCanEdit?: boolean,
	updateFn?: ({ [key: string]: any }) => Promise<void>,
	name: string,
	autoFocus?: boolean,
	initialValue?: string,
	placeholder?: string,
	multiline?: boolean,
	toolTip?: string,
}

type State = {
	value: string,
	focused: boolean,
}

class EditableText extends React.Component<Props, State> {
	static defaultProps = {
		initialValue: '',
		fontSize: 'p',
		placeholder: 'Untitled',
		updateFn: undefined,
		viewerCanEdit: false,
		autoFocus: true,
		multiline: false,
		toolTip: 'Click to edit',
	}

	state = {
		focused: false,
		value: this.props.initialValue || '',
	}

	inputRef = React.createRef<HTMLInputElement>()

	componentDidMount() {
		this.autoSize()
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.initialValue !== this.props.initialValue) {
			this.setState({ value: nextProps.initialValue })
		}
	}

	componentWillUnmount() {
		this.submitChange()
		// const inputRef = this.inputRef ? this.inputRef.current : undefined
	}

	autoSize = () => {
		const field = this.inputRef.current
		if (!this.props.multiline || !field) return
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

	handleChange = async (e: SyntheticInputEvent<HTMLInputElement>) => {
		const { value } = e.target
		await this.setState({ value })
		this.autoSize()
	}

	focus = async () => {
		await this.setState({ focused: true })
		this.autoSize()
	}

	blur = async () => {
		await this.setState({ focused: false })
		this.submitChange()
	}

	submitChange = async () => {
		const { updateFn, name, initialValue } = this.props
		// Use an empty string if initialValue is falsy
		const parsedInitialValue = initialValue || ''
		const { value } = this.state
		if (updateFn && parsedInitialValue !== value) {
			updateFn({ [name]: value || '' })
		}
	}

	render() {
		const { viewerCanEdit, fontSize, placeholder, multiline, autoFocus, toolTip } = this.props
		const { value, focused } = this.state
		const Text = textComponentsMap[fontSize || 'p'] || textComponentsMap.p
		if (!viewerCanEdit) {
			return <Text>{value}</Text>
		}
		const StatusIcon = FaPencilAlt
		return (
			<Wrapper focused={focused}>
				<ToolTip active={!focused} relative={false} message={toolTip || 'Click to edit'}>
					<IconWrapper>
						<StatusIcon />
					</IconWrapper>
					<NativeListener onClick={this.focus}>
						<StyledInput
							onBlur={this.blur}
							fontSize={fontSize}
							as={multiline ? TextArea : undefined}
							autoFocus={autoFocus}
							onChange={this.handleChange}
							value={value}
							ref={this.inputRef}
							placeholder={placeholder}
						/>
					</NativeListener>
				</ToolTip>
			</Wrapper>
		)
	}
}

export default EditableText
