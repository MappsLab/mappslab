import * as React from 'react'
import { DataLayer as DataLayerType } from '../../../types-ts'

const { useEffect } = React

interface DataLayerProps {
	dataLayer: DataLayerType
	applyDataLayer: (src: string) => () => void
}

export const DataLayer = ({ dataLayer, applyDataLayer }: DataLayerProps) => {
	useEffect(() => {
		const removeLayer = applyDataLayer(dataLayer.url)
		console.log(removeLayer)
		return () => removeLayer()
	}, [])

	return null
}
