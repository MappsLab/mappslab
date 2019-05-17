import * as React from 'react'
import styled from 'styled-components'
import { Button } from './Buttons'

const { useState } = React

const Input = styled.input`
	display: none;
`

/**
 * FileUpload
 */

interface Props {
	onSubmit: (any) => void | Promise<void>
	name: string
	label: string
	accept: string
	multiple?: boolean
	Icon?: React.ComponentType<any>
}

export const FileUpload = ({ onSubmit, multiple, name, accept, label, Icon }: Props) => {
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true)
		const inputFile = e.target.files[0]
		await onSubmit({ [name]: inputFile })
		setIsLoading(false)
	}

	return (
		<React.Fragment>
			<Button as="label" disabled={isLoading} htmlFor={name} level="tertiary">
				{Icon ? (
					<React.Fragment>
						<Icon />{' '}
					</React.Fragment>
				) : null}
				{isLoading ? 'Loading..' : label}
			</Button>
			<Input type="file" accept={accept} id={name} name={name} required onChange={handleChange} multiple={multiple} />
		</React.Fragment>
	)
}

FileUpload.defaultProps = {
	Icon: undefined,
	mutiple: false,
}
