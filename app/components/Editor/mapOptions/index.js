// @flow
import { withState, withHandlers, compose } from 'recompose'
import { minMax } from 'Utils/data'

const defaultOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

const withInitialOptions = (props) => props.initialMapOptions || defaultOptions

const zoom = ({ updateMapOptions }) => (level: 'in' | 'out' | number) => () =>
	updateMapOptions((mapOptions) => {
		const zoomLevel = minMax(0, 21)(
			typeof level === 'number'
				? level
				: level === 'in'
					? mapOptions.zoom + 1
					: level === 'out'
						? mapOptions.zoom - 1
						: defaultOptions.zoom,
		)
		console.log(mapOptions, zoomLevel)
		return {
			...mapOptions,
			zoom: zoomLevel,
		}
	})

const setOptions = ({ updateMapOptions }) => (newOptions) => updateMapOptions((mapOptions) => ({ ...mapOptions, ...newOptions }))

export default compose(
	withState('mapOptions', 'updateMapOptions', withInitialOptions),
	withHandlers({
		zoom,
		setOptions,
	}),
)
