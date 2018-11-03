/* eslint-disable no-undef */
import React from 'react'
import { shallow } from 'enzyme'

import { Button } from '../UI/Buttons'

const buttonText = 'Click Me!'

describe('Button Component', () => {
	it('Mounts Correctly', () => {
		const wrapper = shallow(<Button>{buttonText}</Button>)
		expect(wrapper).toMatchSnapshot()
	})
})
