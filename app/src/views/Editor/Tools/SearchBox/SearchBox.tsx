import * as React from 'react'
import { StandaloneSearchBox, useGoogleMap } from '@react-google-maps/api'
import { useRef } from 'react'
import styled, { css } from 'styled-components'

const StyledSearchBar = styled.input`
	${({ theme }) => css`
		box-sizing: border-box;
		width: 350px;
		height: 48px;
		padding: 0 12px;
		border-radius: 3px;
		box-shadow: ${theme.mixins.boxShadow.heavy};
		border: 1px solid ${theme.color.darkGray};
		font-size: 16px;
		outline: none;
		text-overflow: ellipsis;
		position: absolute;
		left: 50%;
		margin-left: -120px;
	`}
`

export const SearchBox = () => {
	const googleMap = useGoogleMap()
	const searchBoxRef = useRef<google.maps.places.SearchBox>()
	const onLoad = (ref) => (searchBoxRef.current = ref)
	const onPlacesChanged = () => {
		if (searchBoxRef.current) {
			const places = searchBoxRef.current.getPlaces()
			if (places && places.length > 0) {
				const place = places[0]
				if (place.geometry) {
					googleMap?.panTo({
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
					})
				}
			}
		}
	}

	return (
		<StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
			<StyledSearchBar type="text" placeholder="Search" />
		</StandaloneSearchBox>
	)
}
