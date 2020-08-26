import styled, { css, DefaultTheme } from 'styled-components'

interface WrapperProps {
	theme: DefaultTheme
	disabled?: boolean
	isOpen?: boolean
}

export const Wrapper = styled.div`
	${({ theme, disabled, isOpen }: WrapperProps) => css`
		color: ${theme.color.primary.normal};
		border: 1px solid;
		border-radius: 3px 3px ${isOpen ? '0px 0px' : '3px 3px'};
		height: ${theme.sizes.chip.large.height};
		width: 300px;
		margin: ${theme.layout.spacing.single} auto;
		position: relative;
		opacity: ${disabled ? '0.2' : 1};
		pointer-events: ${disabled ? 'none' : 'inherit'};
	`};
`

export const LabelWrapper = styled.div`
	${({ theme }) => css`
		color: ${theme.color.primary.normal};
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		position: relative;
		overflow: hidden;
		border-radius: inherit;
	`};
`

export const Label = styled.label`
	${({ theme }) => css`
		font-size: ${theme.font.size.h5};
	`};
`

export const ItemContainer = styled.div`
	${({ theme }) => css`
		height: ${theme.sizes.chip.large.height};
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	`};
`

export const Input = styled.input`
	${({ theme }) => css`
		padding: 0 0 0 15px;
		width: 100%;
		font-size: ${theme.font.size.h4};
	`};
`

interface MenuWrapperProps {
	theme: DefaultTheme
	visible?: boolean
}

export const MenuWrapper = styled.div`
	${({ visible }: MenuWrapperProps) => css`
		display: ${visible ? 'block' : 'none'};
		background-color: white;
		color: inherit;
		position: absolute;
		z-index: 10;
		width: calc(100% + 2px);
		top: 100%;
		left: -1px;
		margin: 0;
		border: 1px solid;
		list-style: none;
		max-height: 190px;
		overflow-y: scroll;
		padding: 0;
	`};
`

export const SelectorListItem = styled.li`
	cursor: pointer;
	width: 100%;
	list-style-type: none;
`

export const List = styled.ul`
	width: 100%;
	margin: 0;
	list-style: none;
	max-height: 190px;
	overflow-y: scroll;
	padding: 0;

	& ${SelectorListItem} {
		border-top: 1px solid;
	}
`

interface MenuArrowProps {
	down?: boolean
}

export const MenuArrow = styled.div`
	${({ down }: MenuArrowProps) => css`
		position: absolute;
		top: calc(50% - ${down === true ? '9px' : '3px'});
		right: 15px;
		&:before {
			content: '';
			display: block;
			width: 0px;
			height: 0px;
			border: 6px solid transparent;
			border-top-color: ${down !== true ? 'inherit' : 'transparent'};
			border-bottom-color: ${down === true ? 'inherit' : 'transparent'};
		}
	`};
`
