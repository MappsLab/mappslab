// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Button } from './Buttons'

const { useRef, useState } = React

const Input = styled.input`
	display: none;
`

/**
 * FileUpload
 */

type Props = {
	onSubmit: (any) => void | Promise<void>,
	name: string,
	label: string,
	accept?: string,
}

const FileUpload = ({ onSubmit, name, accept, label }: Props) => {
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = async (e, file) => {
		setIsLoading(true)
		const inputFile = file || e.target.files[0]
		onSubmit({ [name]: inputFile })
		setIsLoading(false)
	}

	return (
		<React.Fragment>
			<Button as="label" disabled={isLoading} htmlFor={name} level="tertiary">
				{isLoading ? 'Loading..' : label}
			</Button>
			<Input type="file" accept={accept} id={name} name={name} required onChange={handleChange} />
		</React.Fragment>
	)
}

FileUpload.defaultProps = {
	accept: undefined,
}

export default FileUpload