// @flow
import type { $Request } from 'express'

import models from 'Models'

const context = (ctx: { req: $Request }) => {
	if (!ctx.req) return { ...ctx, models }
	const { session, viewer } = ctx.req
	return {
		session,
		viewer,
		models,
	}
}

export default context
