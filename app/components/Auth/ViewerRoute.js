// @flow
import * as React from 'react'
import type { Node } from 'react'
import { Redirect, Route } from 'react-router-dom'
import type { ViewerType } from 'Types/User'
import { Loading } from 'Components/Loading'
import { CurrentViewerQuery } from 'Queries/viewer'

/**
 * ViewerRoute
 */

type Props = {
	render?: null | (({ viewer: ViewerType }) => Node | Array<Node>),
	children?: null | React.Node,
	Component?: null | React.ComponentType<any, any>,
}

// $FlowFixMe -- Flow doesn't like us using the keyword 'Component' as a normal variable
export const ViewerRoute = ({ render, children, Component, ...rest }: Props) => (
	<CurrentViewerQuery>
		{({ data }) => {
			const { viewer, loading } = data.currentViewer
			return (
				<Route
					{...rest}
					render={(routeProps) => {
						if (loading) return <Loading />
						// if (!viewer) return <Redirect to="/login/classrooms" />
						if (!viewer) return <p>:(</p>
						if (Component) return <Component viewer={viewer} {...routeProps} />
						if (children) return children({ viewer, ...routeProps })
						if (render) return render({ viewer, ...routeProps })
						return null
					}}
				/>
			)
		}}
	</CurrentViewerQuery>
)

ViewerRoute.defaultProps = {
	children: null,
	Component: null,
	render: null,
}
