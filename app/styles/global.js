// @flow
/* eslint-disable */

import { injectGlobal } from 'styled-components'
import normalized from './normalized'

injectGlobal`
	${normalized}

	html {
		font-size: 10px;
		font-family: 'Source Sans Pro', 'Helvetica Neue', helvetica, sans-serif;
		font-weight: 300;
	}

	form {
		margin: 0;
	}

	button, input, select, option, textarea {
		background: white;
		font-family: 'Source Sans Pro', 'Helvetica Neue', helvetica, sans-serif;
		font-weight: 300;
		border: none;
		outline: none;
		line-height: normal;
		padding: 0;
		border-radius: 0;
		color: #454545;
	}

	label{
		color: #454545;
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

	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: normal;
	  font-weight: 200;
	  src: url("/fonts/sourcesanspro-extralight.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-extralight.woff") format("woff"), url("/fonts/sourcesanspro-extralight.ttf") format("truetype"), url("/fonts/sourcesanspro-extralight.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: italic;
	  font-weight: 200;
	  src: url("/fonts/sourcesanspro-extralightitalic.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-extralightitalic.woff") format("woff"), url("/fonts/sourcesanspro-extralightitalic.ttf") format("truetype"), url("/fonts/sourcesanspro-extralightitalic.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: normal;
	  font-weight: 300;
	  src: url("/fonts/sourcesanspro-light.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-light.woff") format("woff"), url("/fonts/sourcesanspro-light.ttf") format("truetype"), url("/fonts/sourcesanspro-light.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: italic;
	  font-weight: 300;
	  src: url("/fonts/sourcesanspro-lightitalic.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-lightitalic.woff") format("woff"), url("/fonts/sourcesanspro-lightitalic.ttf") format("truetype"), url("/fonts/sourcesanspro-lightitalic.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: normal;
	  font-weight: 400;
	  src: url("/fonts/sourcesanspro-regular.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-regular.woff") format("woff"), url("/fonts/sourcesanspro-regular.ttf") format("truetype"), url("/fonts/sourcesanspro-regular.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: italic;
	  font-weight: 400;
	  src: url("/fonts/sourcesanspro-italic.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-italic.woff") format("woff"), url("/fonts/sourcesanspro-italic.ttf") format("truetype"), url("/fonts/sourcesanspro-italic.svg#Source Sans Pro") format("svg"); }

	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: normal;
	  font-weight: 700;
	  src: url("/fonts/sourcesanspro-black.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-black.woff") format("woff"), url("/fonts/sourcesanspro-black.ttf") format("truetype"), url("/fonts/sourcesanspro-black.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: italic;
	  font-weight: 700;
	  src: url("/fonts/sourcesanspro-blackitalic.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-blackitalic.woff") format("woff"), url("/fonts/sourcesanspro-blackitalic.ttf") format("truetype"), url("/fonts/sourcesanspro-blackitalic.svg#Source Sans Pro") format("svg"); }

	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: normal;
	  font-weight: 600;
	  src: url("/fonts/sourcesanspro-semibold.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-semibold.woff") format("woff"), url("/fonts/sourcesanspro-semibold.ttf") format("truetype"), url("/fonts/sourcesanspro-semibold.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: italic;
	  font-weight: 600;
	  src: url("/fonts/sourcesanspro-semibolditalic.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-semibolditalic.woff") format("woff"), url("/fonts/sourcesanspro-semibolditalic.ttf") format("truetype"), url("/fonts/sourcesanspro-semibolditalic.svg#Source Sans Pro") format("svg"); }

	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: normal;
	  font-weight: 700;
	  src: url("/fonts/sourcesanspro-bold.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-bold.woff") format("woff"), url("/fonts/sourcesanspro-bold.ttf") format("truetype"), url("/fonts/sourcesanspro-bold.svg#Source Sans Pro") format("svg"); }
	@font-face {
	  font-family: "Source Sans Pro";
	  font-style: italic;
	  font-weight: 700;
	  src: url("/fonts/sourcesanspro-bolditalic.eot?#iefix") format("embedded-opentype"), url("/fonts/sourcesanspro-bolditalic.woff") format("woff"), url("/fonts/sourcesanspro-bolditalic.ttf") format("truetype"), url("/fonts/sourcesanspro-bolditalic.svg#Source Sans Pro") format("svg"); }

	@font-face {
	  font-family: "icomoon";
	  font-style: normal;
	  font-weight: normal;
	  src: url("/fonts/select/icomoon.eot?#iefix") format("embedded-opentype"), url("/fonts/select/icomoon.woff") format("woff"), url("/fonts/select/icomoon.ttf") format("truetype"), url("/fonts/select/icomoon.svg#icomoon") format("svg"); }

`
