/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { Field, Form } from 'Components/Forms'
import { Header2 } from 'Components/Text'
import { emailValidator } from 'Components/Forms/validators'
import { Annotation } from 'Storybook/components'
import { FORM_ERROR } from 'final-form'

const submitHandler = ({ email, password }, FormAPI) => {
	if (email === 'info@availableworks.net' && password === 'password') {
		alert('success')
		return undefined
	}
	return {
		[FORM_ERROR]: 'Email and password do not match.',
	}
}

storiesOf('Components/Forms', module).add('Basic Form (login)', () => (
	<Fragment>
		<Header2 align="center" weight="light">
			Nice to see you again.
		</Header2>
		<Form onSubmit={submitHandler}>
			<Field label="email" name="email" type="email" validate={emailValidator} />
			<Field label="password" name="password" type="password" />
		</Form>
		<Annotation>credentials are "info@availableworks.net" & "password"</Annotation>
	</Fragment>
))
