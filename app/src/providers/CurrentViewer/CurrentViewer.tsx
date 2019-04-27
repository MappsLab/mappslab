import * as React from 'react'
import { User } from 'Types'
import { useMutation, useQuery, Context as ClientContext } from 'urql'
import { setViewerCookie, removeViewerCookie } from 'Utils/storage'
import { CURRENT_VIEWER_QUERY, LOGIN_MUTATION, CurrentViewerResponse, LoginResponse } from './queries'

const { useContext, useReducer, useEffect } = React

interface Props {
	children: React.ReactNode
}

interface Credentials {
	uid: string
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

interface ContextValue extends ViewerState {
	loginUser: (c: Credentials) => Promise<void>
	logoutUser: () => void
}

/**
 * Context Setup
 */

const initialState: ViewerState = {
	viewer: null,
	ready: false,
	loading: false,
}

const defaultContextValues = {
	...initialState,
	loginUser: async () => {},
	logoutUser: () => {},
}

const Context = React.createContext<ContextValue>(defaultContextValues)

export const useCurrentViewer = () => useContext(Context)

/**
 * State
 */

interface Action extends Partial<ViewerState> {
	type: string
}

const NO_VIEWER = 'FETCHED_VIEWER'
const FETCHED_VIEWER = 'FETCHED_VIEWER'
const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REQUIRES_RESET = 'REQUIRES_RESET'
const LOGOUT = 'LOGOUT'

const reducer = (state: ViewerState, action: Action): ViewerState => {
	switch (action.type) {
		case NO_VIEWER:
			return { ...state, ready: true }
		case FETCHED_VIEWER:
			return { ...state, ready: true, viewer: action.viewer }
		case LOGIN_ATTEMPT:
			return { ...state, loading: true }
		case LOGIN_FAILURE:
			return { ...state, error: action.error }
		case LOGIN_SUCCESS:
			return { ...state, viewer: action.viewer }
		case REQUIRES_RESET:
			return { ...state, resetToken: action.resetToken }
		case LOGOUT:
			return { ...state, viewer: null }
		default:
			return state
	}
}

export const CurrentViewer = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [currentViewerQueryState, currentViewerQuery] = useQuery<CurrentViewerResponse>({ query: CURRENT_VIEWER_QUERY })
	const [loginMutationState, loginMutation] = useMutation<LoginResponse>(LOGIN_MUTATION)
	const client = useContext(ClientContext)

	/* Query for the current viewer on mount */
	useEffect(() => {
		const fetchCurrentViewer = async () => {
			console.log('fetching')
			const result = await currentViewerQuery()
			console.log(result)
			// const { data } = result
			// if (data.currentViewer && data.currentViewer.viewer) {
			// 	const { viewer, jwt } = data.currentViewer
			// 	setViewerCookie(jwt)
			// 	dispatch({ type: FETCHED_VIEWER, viewer })
			// } else {
			// 	dispatch({ type: NO_VIEWER })
			// }
		}
		fetchCurrentViewer()
	}, [])

	const loginUser = async (variables: Credentials) => {
		console.log('logging in')
		dispatch({ type: LOGIN_ATTEMPT })
		console.log(variables)
		const result = await loginMutation(variables)
		console.log(result)
		if (result.error) {
			// const message = result.graphQLErrors[0].message
			dispatch({ type: LOGIN_FAILURE, error: { message: 'Incorrect Password' } })
		} else {
			const { viewer, jwt, resetToken } = result.data.loginViewer
			if (resetToken) {
				dispatch({ type: REQUIRES_RESET, resetToken })
			} else {
				setViewerCookie(jwt)
				dispatch({ type: LOGIN_SUCCESS, viewer })
			}
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
	}
	return <Context.Provider value={value}>{children}</Context.Provider>
}
