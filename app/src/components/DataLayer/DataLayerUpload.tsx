import * as React from 'react'
import { FaFolderOpen } from 'react-icons/fa'
import { FileUpload } from '../FileUpload'

const { useState } = React

interface DataLayerUploadProps {
	/* */
}

export const DataLayerUpload = (props: DataLayerUploadProps) => {
	const [submitting, setSubmitting] = useState(false)

	const handleSubmit = (data: any) => {
		setSubmitting(true)
	}

	return (
		<FileUpload
			name="kmlfile"
			label="Browse"
			disabled={submitting}
			icon={FaFolderOpen}
			accept=".kml"
			onSubmit={handleSubmit}
		/>
	)
}
