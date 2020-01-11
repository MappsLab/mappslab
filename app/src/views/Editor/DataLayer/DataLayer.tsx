import * as React from 'react'
import { DataLayer as DataLayerType } from '../../../types-ts'
import config from '../../../config'

const { useEffect } = React

interface DataLayerProps {
	dataLayer: DataLayerType
	applyDataLayer: (src: string) => () => void
}

export const DataLayer = ({ dataLayer, applyDataLayer }: DataLayerProps) => {
	useEffect(() => {
		const url = `${config.dataLayerRoot}${dataLayer.uri}`
		console.log(url)
		const removeLayer = applyDataLayer(url)
		return () => removeLayer()
	}, [])

	return null
}
