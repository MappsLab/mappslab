/* Import SVG files */

declare module '\*.svg' {
	import React = require('react')
	export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
	const src: string
	export default src
}

declare module '*.graphql' {
	import { DocumentNode } from 'graphql'
	const Schema: DocumentNode

	export = Schema
}
