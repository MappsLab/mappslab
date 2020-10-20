import * as React from 'react'
import { DataLayer as DataLayerType } from '../../../types-ts'
import { useCurrentMap } from '../../../providers/CurrentMap'
import { config } from '../../../config'

const { useEffect } = React

interface DataLayerProps {
	dataLayer: DataLayerType
}

export const DataLayer = ({ dataLayer }: DataLayerProps) => {
	const { applyDataLayer } = useCurrentMap()
	console.log(dataLayer)
	useEffect(() => {
		const url = `${config.dataLayerRoot}${dataLayer.uri}`
		const removeLayer = applyDataLayer(url)
		return () => removeLayer()
	}, [])

	return null
}
