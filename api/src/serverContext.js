// @flow
import type { $Request } from 'express'

import models from 'Models'

const context = (ctx: { request: $Request }) => {
	if (!ctx.request) return { ...ctx, models }
	const { session, viewer } = ctx.request
	return {
		session,
		viewer,
		models,
	}
}

export default context
