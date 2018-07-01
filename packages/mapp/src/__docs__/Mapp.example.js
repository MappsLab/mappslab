// @flow
import React from 'react'
import { pins } from './sampleData'
import Mapp from '../index'

const style = {
	width: '100%',
	paddingBottom: '65%',
	position: 'relative',
}
type Props = {}

type State = {
	openPin: string | null,
}

class ExampleMapp extends React.Component<Props, State> {
	state = {
		openPin: null,
	}

	showPinInfo = (pinUid: string) => () => {
		this.setState({ openPin: pinUid })
	}

	renderInfoWindow = (map) => {
		/**
		 * WRONG!!
		 * This is only mounting InfoWindow once. COmponentDidMount is only called the first time!
		 */
		if (!this.state.openPin) return null

		const pin = pins.find((p) => p.uid === this.state.openPin)
		const position = {
			lat: pin.lat,
			lng: pin.lang,
		}
		return (
			<Mapp.InfoWindow map={map} position={position}>
				<p>hi</p>
			</Mapp.InfoWindow>
		)
	}

	render() {
		return (
			<div style={style}>
				<Mapp
					APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
					options={{
						zoom: 9,
					}}
					render={({ map }) => (
						<React.Fragment>
							{pins.map(({ lat, lang, ...props }) => (
								<Mapp.Marker
									key={props.uid}
									position={{
										lat,
										lng: lang,
									}}
									onClick={this.showPinInfo(props.uid)}
									{...props}
									map={map}
								/>
							))}
							{this.renderInfoWindow(map)}
						</React.Fragment>
					)}
				/>
			</div>
		)
	}
}

export default ExampleMapp
