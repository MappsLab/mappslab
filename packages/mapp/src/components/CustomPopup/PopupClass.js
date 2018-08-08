// @flow
/* eslint-disable func-names */
/* eslint-disable no-undef */
import type { LatLng, OverlayView } from '../../types'

let Popup = null

type Options = {
	offset: {
		top: string,
		left: string,
	},
	maxWidth: string,
}

const defaultOptions = {
	offset: {
		top: '-50px',
		left: '0px',
	},
	maxWidth: '800px',
}

type OverlayCreator = (position: LatLng, content: HTMLElement, opts: Options) => OverlayView

const definePopup = (): OverlayView => {
	Popup = function(position: LatLng, content: HTMLElement, opts: Options) {
		const options = {
			...defaultOptions,
			...opts,
		}
		this.position = position
		const pixelOffset = document.createElement('div')
		pixelOffset.style.cssText = `
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: ${options.maxWidth};
		`
		// eslint-disable-next-line no-param-reassign
		content.style.cssText = `
			position: absolute;
			top: ${options.offset.top};
			left: ${options.offset.left};
			transform: translate(-50%, -100%);
		`
		pixelOffset.appendChild(content)

		this.anchorDiv = document.createElement('div')
		this.anchorDiv.style.cssText = `
			height: 0;
			position: absolute;
		`
		this.anchorDiv.appendChild(pixelOffset)
		this.stopEventPropagation()
	}

	// $FlowFixMe
	if (!google) throw new Error('You are creating a popup before the API has been loaded.')

	Popup.prototype = Object.create(google.maps.OverlayView.prototype)

	Popup.prototype.onAdd = function() {
		this.getPanes().floatPane.appendChild(this.anchorDiv)
	}

	Popup.prototype.onRemove = function() {
		if (this.anchorDiv.parentElement) {
			this.anchorDiv.parentElement.removeChild(this.anchorDiv)
		}
	}

	Popup.prototype.draw = function() {
		const divPosition = this.getProjection().fromLatLngToDivPixel(this.position)

		const display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none'
		if (display === 'block') {
			this.anchorDiv.style.left = `${divPosition.x}px`
			this.anchorDiv.style.top = `${divPosition.y}px`
		}
		if (this.anchorDiv.style.display !== display) {
			this.anchorDiv.style.display = display
		}
	}

	Popup.prototype.stopEventPropagation = function() {
		const { anchorDiv } = this
		anchorDiv.style.cursor = 'auto'
		const events = ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown']
		events.forEach((event) => {
			anchorDiv.addEventListener(event, (e) => {
				e.stopPropagation()
			})
		})
	}
	// $FlowFixMe
	return Popup
}

// $FlowFixMe
const createPopup = (): OverlayCreator => Popup || definePopup()

export default createPopup
