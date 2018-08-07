// @flow
import React from 'react'
import Mapp from 'mapp'
import MapEditor from 'Components/Maps/MapEditor'

/**
 * Editor
 */

type Props = {}

const initialOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

const Editor = (props: Props) => (
	<Mapp
		APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
		//
		initialOptions={initialOptions}
		render={(googleMapProps) => <MapEditor {...googleMapProps} {...props} />}
	/>
)

export default Editor
