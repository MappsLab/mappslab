import * as React from 'react'
import { User } from 'Types'
import { useMutation, useQuery, Context as ClientContext } from 'urql'
import { setViewerCookie, removeViewerCookie } from 'Utils/storage'
import {
	CURRENT_VIEWER_QUERY,
	LOGIN_MUTATION,
	RESET_MUTATION,
	CurrentViewerResponse,
	LoginResponse,
	ResetResponse,
} from './queries'

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
	viewer: User | null
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

const Context = React.createContext<ContextValue | undefined>(undefined)

export const useCurrentViewer = () => {
	const ctx = useContext(Context)
	if (!ctx) throw new Error('`useCurrentViewer` must be used within the context of the CurrentViewer provider')
	return ctx
}

/**
 * State
 */

interface Action extends Partial<ViewerState> {
	type: string
}

const NO_VIEWER = 'NO_VIEWER'
const FETCHED_VIEWER = 'FETCHED_VIEWER'
const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REQUIRES_RESET = 'REQUIRES_RESET'
const LOGOUT = 'LOGOUT'

const reducer = (state: ViewerState, action: Action): ViewerState => {
	switch (action.type) {
		case NO_VIEWER:
			return { ...state, ready: true, loading: false }
		case FETCHED_VIEWER:
			return { ...state, ready: true, viewer: action.viewer, loading: false }
		case LOGIN_ATTEMPT:
			return { ...state, loading: true, error: null }
		case LOGIN_FAILURE:
			return { ...state, error: action.error, loading: false }
		case LOGIN_SUCCESS:
			return { ...state, viewer: action.viewer, loading: false, error: null }
		case REQUIRES_RESET:
			return { ...state, resetToken: action.resetToken, loading: false }
		case LOGOUT:
			return { ...state, viewer: null, loading: false, error: null }
		default:
			return state
	}
}

export const CurrentViewer = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [currentViewerQuery] = useQuery<CurrentViewerResponse>({ query: CURRENT_VIEWER_QUERY })
	const [loginMutationState, loginMutation] = useMutation<LoginResponse>(LOGIN_MUTATION)
	const [resetMutationState, resetMutation] = useMutation<ResetResponse>(RESET_MUTATION)
	const client = useContext(ClientContext)
	/* Query for the current viewer on mount */
	useEffect(() => {
		const { data } = currentViewerQuery
		if (!data) return
		if (data.currentViewer && data.currentViewer.viewer) {
			const { viewer, jwt } = data.currentViewer
			setViewerCookie(jwt)
			dispatch({ type: FETCHED_VIEWER, viewer })
		} else {
			dispatch({ type: NO_VIEWER })
		}
	}, [currentViewerQuery.data])

	const loginUser = async (variables: Credentials) => {
		dispatch({ type: LOGIN_ATTEMPT })
		const result = await loginMutation(variables)
		if (result.error) {
			const message = result.error.message.replace('[GraphQL]', '')
			dispatch({ type: LOGIN_FAILURE, error: { message } })
			return { success: false, message }
		} else {
			const { viewer, jwt, resetToken } = result.data.loginViewer
			if (resetToken) {
				dispatch({ type: REQUIRES_RESET, resetToken })
			} else {
				setViewerCookie(jwt)
				dispatch({ type: LOGIN_SUCCESS, viewer })
			}
			return { success: true }
		}
	}

	const resetPassword = async (variables: ResetCredentials) => {
		dispatch({ type: LOGIN_ATTEMPT })
		const result = await resetMutation(variables)
		if (result.error) {
			const message = result.error.message.replace('[GraphQL]', '')
			dispatch({ type: LOGIN_FAILURE, error: { message } })
			return { success: false, message }
		} else {
			const { viewer, jwt, resetToken } = result.data.resetPassword
			if (resetToken) {
				dispatch({ type: REQUIRES_RESET, resetToken })
			} else {
				setViewerCookie(jwt)
				dispatch({ type: LOGIN_SUCCESS, viewer })
			}
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
	return <Context.Provider value={value}>{children}</Context.Provider>
}
