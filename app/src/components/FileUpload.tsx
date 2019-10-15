import * as React from 'react'
import styled from 'styled-components'
import { ValidationError, HelpText } from './Forms'
import { Button } from './Buttons'

const { useState } = React

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const Input = styled.input`
	display: none;
`

/**
 * FileUpload
 */

type ValidationError = string | void

interface Props {
	onSubmit: (formData: any) => void | Promise<void>
	name: string
	label: string
	accept: string
	validate?: (file: File) => ValidationError | Promise<ValidationError>
	multiple?: boolean
	Icon?: React.ComponentType<any>
}

export const FileUpload = ({ onSubmit, validate, multiple, name, accept, label, Icon }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [validationError, setValidationError] = useState<void | string>(undefined)

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e || !e.target || !e.target.files) return
		setIsLoading(true)
		const inputFile = e.target.files[0]
		const error = validate ? await validate(inputFile) : undefined
		if (error) {
			setValidationError(error)
			setIsLoading(false)
		} else {
			await onSubmit({ [name]: inputFile })
			setIsLoading(false)
		}
	}

	return (
		<Wrapper>
			<Button as="label" disabled={isLoading} htmlFor={name} level="tertiary">
				{Icon ? (
					<React.Fragment>
						<Icon />{' '}
					</React.Fragment>
				) : null}
				{isLoading ? 'Loading..' : label}
			</Button>
			<Input type="file" accept={accept} id={name} name={name} required onChange={handleChange} multiple={multiple} />
			{validationError ? <ValidationError>{validationError}</ValidationError> : null}
		</Wrapper>
	)
}

FileUpload.defaultProps = {
	Icon: undefined,
	mutiple: false,
}
