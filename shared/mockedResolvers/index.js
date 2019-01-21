// @flow
import { JSDOM } from 'jsdom'
import { User, userConnection } from './User'
// import { Mission, missionConnection } from './Mission'
// import { Story } from './Story'
// import { Discussion, discussionConnection } from './Discussion'
// import { Post } from './DiscussionPost'
// import { Experience, experienceConnection } from './Experience'
// import { DateTime } from './scalars'
// import { Image } from './Media'
// import { DraftJSON } from './DraftJSON'
import { MockError, mockSlowResponse, mockNestedError } from './mockUtils'

/**
 * Set up a JSDOM so we can use DraftJS convertFromHTML
 */

if (process.env.NODE_ENV !== 'test') {
	// Be sure to not run this during tests,
	// otherwise this writes over the global JSDOM
	const { window } = new JSDOM('', {
		url: 'http://localhost/',
	})

	global.window = window
	global.document = window.document
	global.navigator = window.navigator
	global.HTMLElement = window.HTMLElement
	global.HTMLAnchorElement = window.HTMLAnchorElement
}

/**
 * Resolvers
 */

const resolvers = {
	Query: () => ({
		// missions: missionConnection,
		// users: userConnection,
		// discussions: () => discussionConnection(40),
		// experiences: () => experienceConnection(10),
		// /* Mock stuff for tests & docs */
		// mockSlowResponse,
		// mockNestedError,
	}),

	/* Base Types */
	User,
	// Mission,
	// Story,
	// Experience,
	// Discussion,
	// Post,
	// /* Scalars */
	// MockError,
	// DateTime,
	// Image,
	// DraftJSON,
}

export default resolvers
