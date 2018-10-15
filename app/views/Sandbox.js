// @flow
import React from 'react'
import { ClassroomSelector } from 'Components/Classroom'

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
	return <ClassroomSelector onSelect={onSelect} />
}

export default MyComponent
