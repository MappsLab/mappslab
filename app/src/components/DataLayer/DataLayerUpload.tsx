import * as React from 'react'
import { FaFolderOpen } from 'react-icons/fa'
import { FileUpload } from '../FileUpload'

const { useState } = React

interface DataLayerUploadProps {
	/* */
	onComplete: () => void
	handleUpload: (file: File) => Promise<void>
}

interface KMLUploadFormData {
	kmlfile: File
}

export const DataLayerUpload = ({
	onComplete,
	handleUpload,
}: DataLayerUploadProps) => {
	const [submitting, setSubmitting] = useState(false)

	const handleSubmit = async ({ kmlfile }: KMLUploadFormData) => {
		setSubmitting(true)
		await handleUpload(kmlfile)
		setSubmitting(false)
		onComplete()
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
