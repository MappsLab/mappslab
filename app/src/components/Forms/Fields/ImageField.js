// @flow
import React from 'react'
import ImageCapture from 'Components/UI/ImageCapture'
import { Button } from 'Components/UI/Buttons'
import { Field as FinalFormField } from 'react-final-form'
import { Wrapper, Label, HelpText, ValidationError } from '../Field'

// export function getDataTransferItems(event: HTMLInputElement) {
// 	let dataTransferItemsList = []
// 	if (event.dataTransfer) {
// 		const dt = event.dataTransfer
// 		if (dt.files && dt.files.length) {
// 			dataTransferItemsList = dt.files
// 		} else if (dt.items && dt.items.length) {
// 			// During the drag even the dataTransfer.files is null
// 			// but Chrome implements some drag store, which is accesible via dataTransfer.items
// 			dataTransferItemsList = dt.items
// 		}
// 	} else if (event.target && event.target.files) {
// 		dataTransferItemsList = event.target.files
// 	}
// 	// Convert from DataTransferItemsList to the native Array
// 	return Array.prototype.slice.call(dataTransferItemsList)
// }

/**
 * ImageField
 */

type Props = {
	accept?: string,
	multiple?: boolean,
	label: string,
	name: string,
	helpText?: string,
	required?: boolean,
	change: Function,
}

type State = {
	files: Array<Object>,
}

class ImageField extends React.Component<Props, State> {
	static defaultProps = {
		accept: '',
		multiple: false,
	}

	updateValues = (files: Array<Object>) => {
		this.props.change(this.props.name, files)
	}

	render() {
		const { helpText, accept, multiple, name, label, required } = this.props
		return (
			<FinalFormField name={name}>
				{({ input, meta }) => (
					<Wrapper>
						<Label required={required}>{label}</Label>
						<ImageCapture
							files={input.value}
							accept={accept}
							updateValues={this.updateValues}
							multiple={multiple}
							onFinish={this.finishCapture}
						/>
						<HelpText>{helpText}</HelpText>
						{meta.error && meta.touched ? <ValidationError>{meta.error}</ValidationError> : null}
						{meta.submitError && !meta.dirtySinceLastSubmit ? <ValidationError>{meta.submitError}</ValidationError> : null}
					</Wrapper>
				)}
			</FinalFormField>
		)
		// return (
		// 				<input type="file" accept={accept} multiple={multiple} onChange={this.handleChange} />
		// 				{this.state.previews.map((p) => <img alt="preview" src={p} key={p} style={{ width: '40px' }} />)}
		// 			</Wrapper>
		// )
	}
}

export default ImageField
