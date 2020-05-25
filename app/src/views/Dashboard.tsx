import * as React from 'react'
import { useInspector } from '../components/Inspector/InspectorProvider'
import { useCurrentViewer } from '../providers/CurrentViewer'

const { useEffect } = React

/**
 * Dashboard
 *
 * - simply launch the inspector
 */

export const Dashboard = () => {
	const { viewer } = useCurrentViewer()
	const { inspectItem } = useInspector()

	useEffect(() => {
		if (viewer) inspectItem(viewer)
	}, [viewer])

	return null
}
