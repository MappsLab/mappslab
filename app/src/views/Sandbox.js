// @flow
import React from 'react'
import { LiveClassroomSelector } from 'Components/Classroom'

/**
 * Sandbox
 */

/**
 * MyComponent
 */

const MyComponent = (props: Props) => {
	const onSelect = (a, b) => {
		console.log('!!!')
		console.log(a, b)
	}
	return <LiveClassroomSelector onSelect={onSelect} />
}

export default MyComponent
