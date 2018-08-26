// @flow
import * as React from 'react'
import styled from 'styled-components'
import Title from './Title'
import Item from './Item'

const Wrapper = styled.div`
	margin: ${({ theme }) => theme.spacing.double} 0;
`

const Menu = styled.div`
	${({ theme }) => `
		${theme.lightShadow};
	`};
	border: 1px solid ${({ theme }) => theme.colors.lightGray};
	transition: height 0.3s, opacity 0.2s;
	opacity: ${({ open }) => (open ? 1 : 0)};
	height: ${({ open }) => (open ? '400px' : '0px')};
	overflow-y: scroll;
`

const MenuInner = styled.div`
	padding: ${({ theme }) => theme.spacing.half};
`

/**
 * Dropdown
 */

type DropdownItem = {
	value: any,
	render: ({ active: boolean }) => React.Node,
}

type Props = {
	open?: boolean,
	items: Array<DropdownItem>,
	label: string,
	onSelect?: false | ((any) => void),
}

type State = {
	open: boolean,
	currentValue: null | any,
}

class Dropdown extends React.Component<Props, State> {
	static defaultProps = {
		open: false,
		onSelect: false,
	}

	state = {
		open: this.props.open || false,
		currentValue: null,
	}

	setValue = (currentValue: string | null) => () => {
		this.setState({ currentValue }, () => {
			const { onSelect } = this.props
			if (onSelect) onSelect(currentValue)
		})
	}

	toggleMenu = () => {
		this.setState(({ open }) => ({
			open: !open,
		}))
	}

	render() {
		const { label, items } = this.props
		const { open, currentValue } = this.state
		return (
			<Wrapper>
				<Title label={label} toggleMenu={this.toggleMenu} />
				<Menu open={open}>
					<MenuInner>
						{items.map((i) => (
							<Item key={i.value} {...i} active={i.value === currentValue} setValue={this.setValue} />
						))}
					</MenuInner>
				</Menu>
			</Wrapper>
		)
	}
}

export default Dropdown
