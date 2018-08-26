// @flow

// States
const WELCOME = 'welcome'
const CLASSROOM_SELECT = 'studentLogin'
const STUDENT_SELECT = 'studentSelect'
const TEACHER_LOGIN = 'teacherLogin'
const USER_LOGIN = 'userLogin'
const SUBMITTING = 'submitting'
const SUCCESS = 'success'
const FAILURE = 'failure'
const FINDING_TEACHER = 'findingTeacher'

// Transitions
export const FIND_CLASSROOM = 'findClassroom'
export const SELECTED_CLASS = 'selectedClass'
export const SELECTED_TEACHER_LOGIN = 'selectedTeacherLogin'
export const FOUND_USER = 'foundUser'
export const SELECTED_CLASSROOM = 'foundClassroom'
export const GO_BACK = 'goBack'
export const SUBMIT = 'submit'
export const LOGIN_SUCCESS = 'loginSuccess'
export const LOGIN_FAILURE = 'loginFailure'

// Actions
export const SHOW_ERROR = 'showLoginError'
export const ENTER_WELCOME = 'enterLogin'
export const ENTER_STUDENT_SELECT = 'enterStudentSelect'
export const ENTER_CLASSROOM_SELECT = 'enterClassroomSelect'
export const ENTER_TEACHER_LOGIN = 'enterTeacherLogin'
export const ENTER_USER_LOGIN = 'enterUserLogin'
export const ENTER_SUCCESS = 'enterSuccess'

export const statechart = {
	initial: CLASSROOM_SELECT,
	states: {
		[WELCOME]: {
			on: {
				[SELECTED_CLASS]: CLASSROOM_SELECT,
				[SELECTED_TEACHER_LOGIN]: TEACHER_LOGIN,
				[SELECTED_CLASSROOM]: STUDENT_SELECT,
			},
			onEntry: ENTER_WELCOME,
		},
		[CLASSROOM_SELECT]: {
			onEntry: ENTER_CLASSROOM_SELECT,
			on: {
				[SELECTED_CLASSROOM]: STUDENT_SELECT,
			},
		},
		[STUDENT_SELECT]: {
			onEntry: ENTER_STUDENT_SELECT,
			on: {
				[FOUND_USER]: USER_LOGIN,
				[GO_BACK]: CLASSROOM_SELECT,
			},
		},
		[TEACHER_LOGIN]: {
			on: {
				[SUBMIT]: FINDING_TEACHER,
				[GO_BACK]: WELCOME,
			},
			onEntry: [ENTER_TEACHER_LOGIN],
		},
		[FINDING_TEACHER]: {
			on: {
				[SUCCESS]: [FOUND_USER],
				[FAILURE]: {
					[TEACHER_LOGIN]: {
						actions: [SHOW_ERROR],
					},
				},
			},
		},
		[USER_LOGIN]: {
			onEntry: ENTER_USER_LOGIN,
			on: {
				[GO_BACK]: CLASSROOM_SELECT,
				[LOGIN_SUCCESS]: SUCCESS,
			},
		},
		[SUCCESS]: {
			onEntry: ENTER_SUCCESS,
		},
	},
}
