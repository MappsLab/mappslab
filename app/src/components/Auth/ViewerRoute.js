// @flow
import * as React from 'react'
import type { Node } from 'react'
import { Redirect, Route } from 'react-router-dom'
import type { ViewerType } from 'Types/User'
import { CurrentViewerQuery } from 'Queries/Viewer'

/**
 * ViewerRoute
 */

type Props = {
	render?: null | (({ viewer: ViewerType }) => Node | Array<Node>),
	children?: null | React.Node,
	component?: null | React.ComponentType<any>,
	redirectTo: string,
}

// $FlowFixMe -- Flow doesn't like us using the keyword 'Component' as a normal variable
export const ViewerRoute = ({ render, children, component: Component, redirectTo, ...rest }: Props) => (
	<CurrentViewerQuery>
		{({ data }) => {
			return (
				<Route
					{...rest}
					render={(routeProps) => {
						const { viewer, loading } = data && data.currentViewer ? data.currentViewer : {}
						if (loading) return null
						if (!viewer) return <Redirect to={redirectTo} />
						if (Component) return <Component viewer={viewer} {...routeProps} />
						if (render) return render({ viewer, ...routeProps })
						if (children) return children
						return null
					}}
				/>
			)
		}}
	</CurrentViewerQuery>
)

ViewerRoute.defaultProps = {
	children: null,
	component: null,
	render: null,
}
