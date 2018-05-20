// @flow
import gql from 'graphql-tag'
import { makeQuery } from '../utils'

// todo#16 : Make a Viewer fragment and reuse it in the viewer query
export const query = gql`
	query ViewerQuery {
		viewer {
			uid
			name
		}
	}
`
const config = {
	props: ({ data }) => {
		const { loading, viewer, ...rest } = data
		return {
			loading,
			viewer,
			request: {
				...rest,
			},
		}
	},
}

const withCurrentViewerQuery = makeQuery(query, config)

export default withCurrentViewerQuery
