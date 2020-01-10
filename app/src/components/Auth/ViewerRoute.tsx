import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Viewer } from '../../types-ts'
import { useCurrentViewer } from '../../providers/CurrentViewer'

/**
 * ViewerRoute
 */

interface RenderParameters {
	viewer: Viewer
}

interface Props {
	path: string
	render?: null | ((RenderParameters) => React.ReactNode)
	children?: null | React.ReactNode
	component?: null | React.ComponentType<any>
	redirectTo?: string
}

// $FlowFixMe -- Flow doesn't like us using the keyword 'Component' as a normal variable
export const ViewerRoute = ({
	render,
	children,
	component: Component,
	redirectTo,
	...rest
}: Props) => {
	const { viewer, loading } = useCurrentViewer()
	return (
		<Route
			{...rest}
			render={(routeProps) => {
				if (loading) return null
				if (!viewer) return <Redirect to={redirectTo || '/login'} />
				if (Component) return <Component viewer={viewer} {...routeProps} />
				if (render) return render({ viewer, ...routeProps })
				if (children) return children
				return null
			}}
		/>
	)
}

ViewerRoute.defaultProps = {
	children: null,
	component: null,
	render: null,
}
