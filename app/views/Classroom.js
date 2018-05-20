// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withClassroomQuery } from 'App/queries'
import { Column, ListItem } from 'App/components/Layout'
import { Loading } from 'App/components/Loading'
import { Header2 } from 'App/components/Text'

/**
 * MyComponent
 */

type Props = {
	loading: boolean,
	classroom: Object,
}

const Classroom = (props: Props) => {
	console.log(props)
	return null
}

export default withClassroomQuery(Classroom)
