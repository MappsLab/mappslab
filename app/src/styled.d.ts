import 'styled-components'

declare module 'styled-components' {
	export interface DefaultTheme {
		layout: {
			z: { [key: string]: number }
			spacing: { [key: string]: string }
			flexCenter: FlattenSimpleInterpolation
		}
		font: {
			family: { [key: string]: string }
			size: { [key: string]: string }
			weight: { [key: string]: string }
		}
		color: {
			primary: { [key: string]: string }
			secondary: { [key: string]: string }
			[key: string]: string | { [key: string]: string }
		}
		sizes: {
			chip: {
				small: {
					[key: string]: string
				}
				large: {
					[key: string]: string
				}
				full: {
					[key: string]: string
				}
			}
			column: { [key: string]: string }
		}
		mixins: {
			boxShadow: { [key: string]: string }
			[key: string]:
				| string
				| FlattenSimpleInterpolation
				| { [key: string]: string }
		}
	}
}
