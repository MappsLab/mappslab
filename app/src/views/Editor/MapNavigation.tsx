import * as React from 'react'
import styled, { DefaultTheme, css } from 'styled-components'
import { Map } from 'Types'
// import type { Transition } from 'react-automata'
import { Header2, Header4 } from 'Components/Text'
import Burger from 'Components/Burger'
import { Button } from 'Components/Buttons'

const { useState } = React

interface BackgroundProps {
	theme: DefaultTheme
	visible?: boolean
}

const Background = styled.button`
	${({ theme, visible }: BackgroundProps) => css`
		z-index: ${theme.layout.z.navigation - 1};
		position: fixed;
		opacity: ${visible ? '1' : '0'};
		${!visible && 'pointer-events: none;'}
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: 0.2s;
		background-color: rgba(0, 0, 0, 0.2);
	`}
`

const TitleWrapper = styled.button`
	${({ theme }) => css`
		z-index: ${theme.layout.z.mapTool};
		position: fixed;
		top: 10px;
		left: 10px;
		background-color: white;
		box-shadow: ${theme.mixins.boxShadow.heavy};
		border-radius: 2px;
		border: 1px solid ${theme.color.darkGray};
		padding: ${theme.layout.spacing.half};
		display: flex;
	`}
`

const ClassInfo = styled.div`
	${({ theme }) => css`
		margin-left: ${theme.layout.spacing.half};
	`}
`

interface NavigationProps {
	theme: DefaultTheme
	open?: boolean
}

const Navigation = styled.nav`
	${({ theme, open }: NavigationProps) => css`
		z-index: ${theme.layout.z.navigation - 1};
		position: fixed;
		top: 0;
		left: ${open ? '0' : '-255px'};
		width: 250px;
		height: 100%;
		transition: 0.2s;
		background-color: white;
		border-color: ${theme.color.middleGray};
		border-right-width: 1px;
		box-shadow: 2px 0 2px rgba(0, 0, 0, 0.2);
	`}
`

const Logout = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
	display: flex;
	justify-content: center;
`

type Props = {
	map: Map
	// transition: Transition,
}

const MapNavigation = ({ map }: Props) => {
	const [open, setOpen] = useState(false)
	const { title, classroom } = map

	const toggleMenu = () => setOpen(!open)

	const closeMenu = () => setOpen(false)

	return (
		<React.Fragment>
			<TitleWrapper onClick={toggleMenu}>
				<Burger />
				<ClassInfo>
					<Header2>🗺 {title}</Header2>
					{classroom ? (
						<Header4 align="center" color="middleGray">
							{classroom.title}
						</Header4>
					) : null}
				</ClassInfo>
			</TitleWrapper>
			<Background visible={open} onClick={closeMenu} />
			<Navigation open={open}>
				<Logout>
					<Button level="tertiary">Log Out</Button>
				</Logout>
			</Navigation>
		</React.Fragment>
	)
}

export default MapNavigation
