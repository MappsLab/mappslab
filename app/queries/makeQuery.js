// @flow
import type { ComponentType } from 'react'
import * as R from 'ramda'
import { graphql } from 'react-apollo'
// import { mapProps } from 'recompose'

// export const defaultPropsToMap = {
// 	props: ({ ownProps, data }) => {
// 		return {
// 			...data,
// 		}
// 	},
// }

const makeQuery = (query, config: Object, Component: ComponentType<any>) => graphql(query, config)(Component)

export default R.curry(makeQuery)
