import * as React from 'react'
import { DataLayer } from '../../types-ts'
import { ListOfTypeProps, ListOfTypeBaseProps } from './utils'
import { List } from './List'

/**
 * DataLayerList
 */

interface DataLayerListProps {
	title: string
	dataLayers: DataLayer[]
	viewerCanAdd: boolean
	addNewDataLayer: (title: string) => Promise<void>
	removeDataLayer: (dataLayer: DataLayer) => Promise<void>
}

const noResults = async () => undefined
const handleClick = async () => undefined

export const DataLayerList = ({
	title,
	dataLayers,
	viewerCanAdd,
	addNewDataLayer,
	removeDataLayer,
}: DataLayerListProps) => {
	const buttons = [
		{
			label: 'Remove',
			handler: removeDataLayer,
		},
	]
	return (
		<List
			search={noResults}
			create={addNewDataLayer}
			onSearchResultClick={handleClick}
			title={title}
			items={dataLayers}
			type="dataLayer"
			viewerCanAdd={viewerCanAdd}
			buttons={buttons}
		/>
	)
}
