/* eslint-disable no-undef */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { FORM_ERROR } from 'final-form'

import { Form, Field } from '../Forms/'
import { FormMessage, FormError } from '../Forms/Form'
import { SubmitButton, Button } from '../UI/Buttons'
import { ValidationError } from '../Forms/Field'
import { email, required } from '../Forms/validators'

describe('Form Component', () => {
	it('Mounts Correctly', () => {
		const wrapper = shallow(<Form />)
		expect(wrapper).toMatchSnapshot()
	})

	it('Supplies its own submit button', () => {
		const wrapper = mount(
			<Form onSubmit={() => {}}>
				<Field label="Email" name="email" type="email" validate={email} />
				<Field label="Password" name="password" type="password" />
			</Form>,
		)
		expect(wrapper.find(SubmitButton).length).toBe(1)
	})

	// TODO: This isn't working, i can't get the mock to be called..
	// it('Will not submit when regular buttons are pressed', () => {
	// 	const mockSubmitFn = jest.fn()
	// 	const wrapper = mount(
	// 		<Form
	// 			onSubmit={() => {
	// 				console.log('!!!')
	// 				mockSubmitFn()
	// 			}}
	// 		>
	// 			<Field label="Email" name="email" type="email" validate={email} />

	// 			<Button data-test="not-submit">Some other button</Button>
	// 		</Form>,
	// 	)

	// 	wrapper.find('input[name="email"]').simulate('change', { target: { value: 'joseph@joseph.com' } })
	// 	// console.log(wrapper.debug())
	// 	wrapper.find('button[type="submit"]').simulate('click')
	// 	expect(mockSubmitFn).toHaveBeenCalled()
	// })

	describe('Submission', () => {
		const mockSubmitFn = jest.fn()
		const wrapper = mount(
			<Form onSubmit={mockSubmitFn}>
				<Field label="Email" name="email" type="email" validate={email} />
				<Field label="Password" name="password" type="password" />
			</Form>,
		)

		beforeEach(() => {
			mockSubmitFn.calls = []
			wrapper.unmount()
			wrapper.mount()
		})

		it('Will not submit when pristine', () => {
			wrapper.find('button[type="submit"]').simulate('click')
			expect(mockSubmitFn).not.toHaveBeenCalled()
		})

		it('Will enable button if not pristine', () => {
			wrapper.find('input[name="email"]').simulate('change', { target: { value: 'joseph@joseph.com' } })
			expect(wrapper.find('button[type="submit"]').props().disabled).toEqual(false)

			// TODO: This test isn't working, i can't get the mock to be called...
			// wrapper.find('button[type="submit"]').simulate('click')
			// expect(mockSubmitFn).toHaveBeenCalled()
		})

		it('Will disable the button with a `disabled` prop', () => {
			wrapper.setProps({ disabled: true })
			wrapper.find('input[name="email"]').simulate('change', { target: { value: 'joseph' } })
			expect(wrapper.find('button[type="submit"]').props().disabled).toEqual(true)
		})

		it('Will disable the button if the form is invalid', () => {
			wrapper.find('input[name="email"]').simulate('change', { target: { value: 'joseph' } })
			expect(wrapper.find('button[type="submit"]').props().disabled).toEqual(true)
		})
	})

	describe('Form Messages & Validation Errors', () => {
		const generalMessage = 'A general form message'

		const errorMessage = 'There was an error'
		const returnSubmissionError = () => ({
			[FORM_ERROR]: errorMessage,
		})
		const wrapper = mount(
			<Form onSubmit={returnSubmissionError} message={generalMessage}>
				<Field name="firstName" label="name" />
			</Form>,
		)

		it('Renders general messages', () => {
			expect(wrapper.find(FormMessage).text()).toEqual(generalMessage)
		})

		it('Renders form submission errors', () => {
			wrapper.find('input[name="firstName"]').simulate('change', { target: { value: 'joseph' } })
			wrapper.find('form').simulate('submit')
			expect(wrapper.find(FormError).text()).toEqual(errorMessage)
		})
	})

	describe('Field validation & submission errors', () => {
		const emailMessage = 'Email submission error'
		const usernameMessage = 'Username submission error'
		const returnFieldErrors = () => ({
			email: emailMessage,
			username: usernameMessage,
		})

		const wrapper = mount(
			<Form onSubmit={returnFieldErrors}>
				<Field name="email" label="email" type="email" validate={email} />
				<Field name="username" label="username" validate={required} />
			</Form>,
		)

		const emailInput = wrapper.find('input[name="email"]')
		const usernameInput = wrapper.find('input[name="username"]')
		const form = wrapper.find('form')

		emailInput.simulate('change', { target: { value: 'wrong' } })
		emailInput.simulate('blur')
		expect(
			wrapper
				.find({ name: 'email' })
				.find(ValidationError)
				.text(),
		).toEqual('Please enter a valid email address')

		emailInput.simulate('change', { target: { value: 'valid@email.com' } })
		emailInput.simulate('blur')

		expect(wrapper.find({ name: 'email' }).find(ValidationError).length).toEqual(0)

		form.simulate('submit')

		expect(
			wrapper
				.find({ name: 'username' })
				.find(ValidationError)
				.text(),
		).toEqual('Required')
		usernameInput.simulate('change', { target: { value: 'myUsername' } })

		expect(wrapper.find({ name: 'username' }).find(ValidationError).length).toEqual(0)

		form.simulate('submit')

		expect(wrapper.text()).toContain(emailMessage)
		expect(wrapper.text()).toContain(usernameMessage)
	})

	describe('Form allows for re-submission after errors', () => {
		// console.log('Running test..')
		const invalidEmail = 'Invalid Email'
		const returnSubmitErrors = (values) => {
			if (values.email !== 'joseph@good-idea.studio') return { [FORM_ERROR]: invalidEmail }
			return undefined
		}
		const wrapper = mount(
			<Form onSubmit={returnSubmitErrors}>
				<Field name="email" label="email" type="email" validate={email} />
			</Form>,
		)

		const emailInput = wrapper.find('input[name="email"]')
		const form = wrapper.find('form')
		emailInput.simulate('change', { target: { value: 'josephkthomas@gmail.com' } })

		form.simulate('submit')
		expect(wrapper.find(FormError).text()).toBe(invalidEmail)
		expect(wrapper.find(SubmitButton).props().disabled).toBe(true)
		emailInput.simulate('change', { target: { value: 'joseph@good-idea.studio' } })
		expect(wrapper.find(SubmitButton).props().disabled).toBe(false)
	})
})
