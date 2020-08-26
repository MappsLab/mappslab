import * as React from 'react'
import { Button } from '../../components/Buttons'
import Toolbar from './Tools/Toolbar'

/**
 * NotLoggedIn
 */

export const NotLoggedIn = () => (
	<Toolbar>
		<Button to="/login">Log In</Button>
	</Toolbar>
)

