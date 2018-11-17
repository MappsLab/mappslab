// @flow
/* eslint-disable */

import { createGlobalStyle } from 'styled-components'
import normalized from './normalized'

const GlobalStyle = createGlobalStyle`
	${normalized}
	@import url('https://fonts.googleapis.com/css?family=Work+Sans:400,500,600');

	${({ theme }) => `
		html {
			font-size: 10px;
			font-family: ${theme.font.family.sans};
			font-weight: 300;
		}

		body {
			background-color: #e2e2e2;
		}

		form {
			margin: 0;
		}

		button, input, select, option, textarea {
			background: white;
			font-family: ${theme.font.family.sans};
			font-weight: 300;
			border: none;
			outline: none;
			line-height: normal;
			padding: 0;
			border-radius: 0;
			color: #454545;
		}

		input, textarea {
			max-width: 100%;
		}

		button {
			cursor: pointer;
		}

		h1, h2, h3, h4, h5, h6, p, li, ol {
			font-weight: 300;
			margin: 0;
		}

		a {
			text-decoration: none;
			color: inherit;
		}

		* {
			box-sizing: border-box;
		}

		body {
			padding: 0;
		}

		#root,
		#reactRoot {
			height: 100%;
		}

		figure {
			margin 0;
		}

		img {
			max-width: 100%;
		}
	`}

`

export default GlobalStyle
