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

const INIT = 'init'
export const WELCOME = 'welcome'
export const SELECT_CLASSROOM = `${studentPrefix}_selectClassroom`
export const SELECT_STUDENT = `${studentPrefix}_selectStudent`
export const FIND_TEACHER = `${teacherPrefix}_findTeacher`
export const FETCHING_TEACHER = `${teacherPrefix}_teacherPending`
export const ENTER_PASSWORD = `${loginPrefix}_enterPassword`
export const SET_NEW_PASSWORD = `${loginPrefix}_setNewPassword`
export const LOGIN_SUCCESS = 'loginSuccess'

/**
 * Transitions
 */

const ERROR = 'error'
export const WITH_VIEWER = 'withViewer'
export const NO_VIEWER = 'noViewer'
export const SELECTED_STUDENT_FLOW = 'selectedStudentFlow'
export const SELECTED_TEACHER_FLOW = 'selectedTeacherFlow'
export const SELECTED_CLASSROOM = 'selectedClassroom'
export const SELECTED_STUDENT = 'selectedStudent'
export const FETCHED_TEACHER = 'fetchedTeacher'
export const REQUIRE_RESET = 'requireReset'
export const SUCCESS = 'success'
export const LOGOUT = 'logout'

export const SUBMIT = 'submit'

// Actions
export const SHOW_ERROR = 'showLoginError'
export const SHOW_NEWPW_SUCCESS = 'showNewPWSuccess'
export const SHOW_TEACHER_BUTTON = 'showTeacherButton'
export const SHOW_STUDENT_BUTTON = 'showStudentButton'
export const DISABLE_INPUT = 'disableInput'

export const statechart = {
	initial: INIT,
	on: {
		[SELECTED_STUDENT_FLOW]: SELECT_CLASSROOM,
		[SELECTED_TEACHER_FLOW]: FIND_TEACHER,
	},

	states: {
		[INIT]: {
			on: {
				[WITH_VIEWER]: LOGIN_SUCCESS,
				[NO_VIEWER]: SELECT_CLASSROOM,
			},
		},
		[WELCOME]: {},
		[SELECT_CLASSROOM]: {
			on: {
				[SELECTED_TEACHER_FLOW]: FIND_TEACHER,
				[SELECTED_CLASSROOM]: SELECT_STUDENT,
			},
		},
		[SELECT_STUDENT]: {
			on: {
				[SELECTED_STUDENT]: ENTER_PASSWORD,
			},
		},
		[FIND_TEACHER]: {
			on: {
				[SUBMIT]: {
					[FIND_TEACHER]: {
						actions: [DISABLE_INPUT],
					},
				},
				[ERROR]: {
					[FIND_TEACHER]: {
						actions: [SHOW_ERROR],
					},
				},
				[FETCHED_TEACHER]: ENTER_PASSWORD,
			},
		},
		[ENTER_PASSWORD]: {
			on: {
				[SUCCESS]: LOGIN_SUCCESS,
				[REQUIRE_RESET]: SET_NEW_PASSWORD,
				[ERROR]: {
					[ENTER_PASSWORD]: {
						actions: [SHOW_ERROR],
					},
				},
			},
		},
		[SET_NEW_PASSWORD]: {
			on: {
				[SUCCESS]: {
					[LOGIN_SUCCESS]: {
						actions: [SHOW_NEWPW_SUCCESS],
					},
				},
				[ERROR]: {
					[SET_NEW_PASSWORD]: {
						actions: [SHOW_ERROR],
					},
				},
			},
		},
		[LOGIN_SUCCESS]: {
			on: {
				[LOGOUT]: WELCOME,
			},
		},
	},
}
