// @flow

import React from 'react'
import { withApollo, compose } from 'react-apollo'
import { withCurrentViewerQuery } from 'Queries'
import { Loading } from 'Components/Loading'
const debug = require('debug')('app')

// const loadViewer = (Component) => ({ client, ...rest }) => {
// 	try {
// 		const { viewer } = client.readQuery({ query })
// 		return <Component {...rest} viewer={viewer} />
// 	} catch (e) {
// 		debug(
// 			'There was a problem fetching the current viewer. The component loaded with `withViewer` was likely rendered before any `withCurrentViewer` query had been made',
// 		)
// 		return <Component {...rest} viewer={null} />
// 	}
// }

// export const withViewer = compose(withApollo, loadViewer)

const loadViewer = (Component) => ({ loading, viewer, ...rest }) => {
	console.log(loading, viewer)
	return loading ? <Loading /> : <Component viewer={viewer} {...rest} />
}

export const withViewer = compose(
	withCurrentViewerQuery,
	loadViewer,
)
