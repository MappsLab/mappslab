import * as React from 'react'
import { Viewer } from '../../types-ts'
import { setViewerCookie, removeViewerCookie } from 'Utils/storage'
import {
	useCurrentViewerQuery,
	useUserLoginMutation,
	useResetPasswordMutation,
} from '../../queries'
// import {
// 	useCurrentViewerQuery,
// 	useLoginMutation,
// 	useResetMutation,
// } from './queries'

const { useContext, useReducer, useEffect } = React

interface Props {
	children: React.ReactNode
}

export interface Credentials {
	uid: string
	password: string
}

export interface ResetCredentials {
	resetToken: string
	password: string
}

interface ViewerState {
	viewer: Viewer | null
	loading: boolean
	ready: boolean
	resetToken?: string
	error?: {
		message: string
	}
}

interface LoginResult {
	success: boolean
	message?: string
}

interface ContextValue extends ViewerState {
	loginUser: (c: Credentials) => Promise<LoginResult>
	resetPassword: (c: ResetCredentials) => Promise<LoginResult>
	logoutUser: () => void
}

/**
 * Context Setup
 */

const initialState: ViewerState = {
	viewer: null,
	ready: false,
	loading: true,
}

const ViewerContext = React.createContext<ContextValue | undefined>(undefined)

export const useCurrentViewer = () => {
	const ctx = useContext(ViewerContext)
	if (!ctx)
		throw new Error(
			'`useCurrentViewer` must be used within the context of the CurrentViewer provider',
		)
	return ctx
}

export const CurrentViewerConsumer = ViewerContext.Consumer

/**
 * State
 */

const NO_VIEWER = 'NO_VIEWER'
const FETCHED_VIEWER = 'FETCHED_VIEWER'
const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REQUIRES_RESET = 'REQUIRES_RESET'
const LOGOUT = 'LOGOUT'

type NoViewerAction = { type: typeof NO_VIEWER }
type FetchedViewerAction = { type: typeof FETCHED_VIEWER; viewer: Viewer }
type LoginAttemptAction = { type: typeof LOGIN_ATTEMPT }
type LoginFailureAction = {
	type: typeof LOGIN_FAILURE
	error: { message: string }
}
type LoginSuccessAction = { type: typeof LOGIN_SUCCESS; viewer: Viewer }
type RequiresResetAction = { type: typeof REQUIRES_RESET; resetToken: string }
type LogoutAction = { type: typeof LOGOUT }

type Action =
	| NoViewerAction
	| FetchedViewerAction
	| LoginAttemptAction
	| LoginFailureAction
	| LoginSuccessAction
	| RequiresResetAction
	| LogoutAction

const reducer = (state: ViewerState, action: Action): ViewerState => {
	switch (action.type) {
		case NO_VIEWER:
			return { ...state, ready: true, loading: false }
		case FETCHED_VIEWER:
			return { ...state, ready: true, viewer: action.viewer, loading: false }
		case LOGIN_ATTEMPT:
			return { ...state, loading: true, error: undefined }
		case LOGIN_FAILURE:
			return { ...state, error: action.error, loading: false }
		case LOGIN_SUCCESS:
			return {
				...state,
				viewer: action.viewer,
				loading: false,
				error: undefined,
			}
		case REQUIRES_RESET:
			return { ...state, resetToken: action.resetToken, loading: false }
		case LOGOUT:
			return { ...state, viewer: null, loading: false, error: undefined }
		default:
			return state
	}
}

export const CurrentViewer = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const currentViewerResponse = useCurrentViewerQuery()
	const [loginMutation] = useUserLoginMutation()
	const [resetMutation] = useResetPasswordMutation()

	useEffect(() => {
		const { data } = currentViewerResponse
		if (!data) return
		if (data.currentViewer && data.currentViewer.viewer) {
			const { viewer, jwt } = data.currentViewer
			setViewerCookie(jwt)
			dispatch({ type: FETCHED_VIEWER, viewer })
		} else {
			dispatch({ type: NO_VIEWER })
		}
	}, [currentViewerResponse.data])

	const loginUser = async (variables: Credentials) => {
		dispatch({ type: LOGIN_ATTEMPT })
		const result = await loginMutation({ variables })
		if (result.errors) {
			const message = result.errors[0].message.replace('[GraphQL]', '')
			dispatch({ type: LOGIN_FAILURE, error: { message } })
			return { success: false, message }
		} else if (!result.data) {
			const message = 'No data received'
			dispatch({ type: LOGIN_FAILURE, error: { message } })
			return { success: false, message }
		} else {
			const { loginViewer } = result.data
			if ('resetToken' in loginViewer) {
				dispatch({ type: REQUIRES_RESET, resetToken: loginViewer.resetToken })
			} else {
				const { jwt, viewer } = loginViewer
				setViewerCookie(jwt)
				dispatch({ type: LOGIN_SUCCESS, viewer })
			}
			return { success: true }
		}
	}

	const resetPassword = async (variables: ResetCredentials) => {
		dispatch({ type: LOGIN_ATTEMPT })
		const result = await resetMutation({ variables })
		if (result.errors) {
			const message = result.errors[0].message.replace('[GraphQL]', '')
			dispatch({ type: LOGIN_FAILURE, error: { message } })
			return { success: false, message }
		} else if (!result.data) {
			const message = 'No data received'
			dispatch({ type: LOGIN_FAILURE, error: { message } })
			return { success: false, message }
		} else {
			const { viewer, jwt } = result.data.resetPassword
			setViewerCookie(jwt)
			dispatch({ type: LOGIN_SUCCESS, viewer })
			return { success: true }
		}
	}
	const logoutUser = () => {
		removeViewerCookie()
		dispatch({ type: LOGOUT })
	}

	const value = {
		...state,
		loginUser,
		logoutUser,
		resetPassword,
	}
	return (
		<ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>
	)
}
