// @flow
/* eslint-disable func-names */
/* eslint-disable no-undef */

/**
 * Creates a dummy overlay view so we can extract DOM tools
 */

let Dummy = null

const defineDummy = () => {
	Dummy = function(map) {
		this.setMap(map)
	}
	// $FlowFixMe
	if (!google) throw new Error('You are trying to use `google` before the API has been loaded.')
	Dummy.prototype = new google.maps.OverlayView()
	Dummy.prototype.draw = () => {}
	Dummy.prototype.onAdd = () => {}
	Dummy.prototype.onRemove = () => {}

	return Dummy
}

const getDummy = () => Dummy || defineDummy()

const getTools = (map) => {
	const Dummy = getDummy()
	const dum = new Dummy(map)
	console.log(dum.getProjection())
}

export default getTools
