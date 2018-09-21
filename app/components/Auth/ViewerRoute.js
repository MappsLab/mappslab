// @flow
import * as React from 'react'
import type { Node } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { withCurrentViewerQuery } from 'Queries'
import type { ViewerType } from 'Types/User'
import { Loading } from 'Components/Loading'

/**
 * ViewerRoute
 */

type Props = {
	viewer: null | ViewerType,
	loading: boolean,
	render?: null | (({ viewer: ViewerType }) => Node | Array<Node>),
	children?: null | React.Node,
	component?: null | React.ComponentType<any, any>,
}

const ViewerRouteComponent = ({ loading, viewer, render, children, component: Component, ...rest }: Props) => (
	<Route
		{...rest}
		render={(routeProps) => {
			console.log(viewer)
			if (loading) return <Loading />
			if (!viewer) return <Redirect to="/login/classrooms" />
			if (Component) return <Component viewer={viewer} {...routeProps} />
			if (children) return children({ viewer, ...routeProps })
			if (render) return render({ viewer, ...routeProps })
			return null
		}}
	/>
)

ViewerRouteComponent.defaultProps = {
	children: null,
	component: null,
	render: null,
}

export const ViewerRoute = withCurrentViewerQuery(ViewerRouteComponent)
