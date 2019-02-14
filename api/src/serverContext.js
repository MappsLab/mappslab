// @flow
import type { $Request } from 'express'

import models from 'Models'

const context = (ctx: { req: $Request }) => {
	const { session, viewer } = ctx.req
	if (!ctx.req) return { ...ctx, models }
	return {
		session,
		viewer,
		models,
	}
}

export default context
