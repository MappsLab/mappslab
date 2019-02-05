import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from 'react-testing-library'
import theme from '../../src/theme'

const renderWithWrapper = (node, ...options) => render(<ThemeProvider theme={theme}>{node}</ThemeProvider>, ...options)

// re-export everything
export * from 'react-testing-library'

// override render method
export { renderWithWrapper as render }
