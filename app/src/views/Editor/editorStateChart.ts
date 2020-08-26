/**
 * States
 */

/* State Prefixes */
const teacherPrefix = 'teacher'
const studentPrefix = 'student'
const loginPrefix = 'login'
export const TEACHER_FLOW = `${teacherPrefix}_*`
export const STUDENT_FLOW = `${studentPrefix}_*`
export const LOGIN_FLOW = `${loginPrefix}_*`

export const WELCOME = 'welcome'
export const LESSON = 'lesson'
export const DROP_PIN = 'dropPin'
export const BROWSE = 'browse'
export const INSPECT = 'inspect'


export const CLICK_DROP_PIN = 'clickDropPin'
export const CLICK_ITEM = 'clickItem'
export const CLOSE = 'close'

// ACTIONS
const ERROR = 'error'
export const ENTER_LESSON = 'enterLesson'

export const editorStateChart = {
	initial: WELCOME,

	states: {
		[WELCOME]: {
			on: {
				[ENTER_LESSON]: LESSON
			}
		},
		[LESSON]: {
			initial: BROWSE,
			states: {
				[BROWSE]: {
					on: {
						[CLICK_ITEM]: INSPECT
					}
				},
				[DROP_PIN]: {

				},
				[INSPECT]: {
					on: {
						[CLOSE]: LESSON
					}
				}
			},
			on: {
				[CLICK_DROP_PIN]: DROP_PIN
			}
		}
	},
}
