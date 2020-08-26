import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { render as rtlRender } from '@testing-library/react'
import theme from '../theme'

export const render = (node, ...options) =>
	rtlRender(<ThemeProvider theme={theme}>{node}</ThemeProvider>, ...options)
