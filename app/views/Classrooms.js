// @flow
import React from 'react'
import { withClassroomsQuery } from 'App/queries'

/**
 * Classrooms
 */

class Classrooms extends React.Component {
	render() {
		console.log(this.props)
		return <div>Classrooms Component</div>
	}
}

export default withClassroomsQuery(Classrooms)
