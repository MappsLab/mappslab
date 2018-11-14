// @flow

export const IsUserError = Symbol('IsUserError')

export class UserError extends Error {
	constructor(...args: any) {
		super(...args)
		this.name = 'Error'
		const [message] = args
		this.message = message
		// $FlowFixMe
		this[IsUserError] = true
		// $FlowFixMe
		Error.captureStackTrace(this, 'Error')
	}
}

export class AuthorizationError extends UserError {
	constructor(...args: any) {
		super(...args)
		this.name = 'AuthorizationError'
	}
}

export class ValidationError extends UserError {
	constructor(...args: any) {
		super(...args)
		this.name = 'ValidationError'
	}
}
