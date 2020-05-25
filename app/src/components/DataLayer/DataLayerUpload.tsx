import * as React from 'react'
import { FaFolderOpen } from 'react-icons/fa'
import { FileUpload } from '../FileUpload'

const { useState } = React

interface DataLayerUploadProps {
	/* */
	onComplete: () => Promise<void> | void
	handleUpload: (file: File) => Promise<void>
}

interface KMLUploadFormData {
	kml: File
}

export const DataLayerUpload = ({
	onComplete,
	handleUpload,
}: DataLayerUploadProps) => {
	const [submitting, setSubmitting] = useState(false)

	const handleSubmit = async ({ kml }: KMLUploadFormData) => {
		setSubmitting(true)
		await handleUpload(kml)
		setSubmitting(false)
		onComplete()
	}

	return (
		<FileUpload
			name="kml"
			label="Browse"
			disabled={submitting}
			icon={FaFolderOpen}
			accept=".kml"
			onSubmit={handleSubmit}
		/>
	)
}
