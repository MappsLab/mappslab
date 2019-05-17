import * as React from 'react'
import { InspectorConsumer } from '../components/Inspector'
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
		inspectItem(viewer)
	}, [])

	return null
}
