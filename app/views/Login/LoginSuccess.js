// @flow
import React from 'react'
import { Action } from 'react-automata'
import { Link } from 'react-router-dom'
import { Header2, Header4 } from 'Components/Text'
import { CurrentViewerQuery } from 'Queries/viewer'
import { SHOW_NEWPW_SUCCESS } from './statechart'

/**
 * LoginSuccess
 */

const LoginSuccess = () => (
	<CurrentViewerQuery>
		{({ data }) => (
			<React.Fragment>
				<Header2>Hi, {data.currentViewer.viewer.name}!</Header2>
				<Action is={SHOW_NEWPW_SUCCESS}>
					<Header4>Your new password is set.</Header4>
				</Action>
				<Link to="/dashboard">Continue to your dashboard -> </Link>
			</React.Fragment>
		)}
	</CurrentViewerQuery>
)

export default LoginSuccess
