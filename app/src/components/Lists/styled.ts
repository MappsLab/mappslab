import styled, { css, DefaultTheme } from 'styled-components'
import { Button } from 'Components/Buttons'
import { Header4, Header5 } from 'Components/Text'

/**
 * Main Wrapper
 */

export const ListTitle = styled(Header4)`
	${({ theme }) => css`
		color: ${theme.color.primary.light};
		padding: ${theme.layout.spacing.half};
		background-color: ${theme.color.xLightGray};
	`}
`

export const ListWrapper = styled.div`
	${({ theme }) => css`
		margin: ${theme.layout.spacing.double} 0;
		border: 1px solid ${theme.color.lightGray};
		border-radius: 2px;
	`}
`

export const ListItems = styled.div``

/**
 * List Items
 */

export const ListItemWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		justify-content: space-between;
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.half};
		border-top: 1px solid ${theme.color.lightGray};
		cursor: pointer;

		&:hover {
			background-color: ${theme.color.xLightGray};
		}

		&:last-child {
			border-bottom: 1px solid ${theme.color.lightGray};
		}
	`}
`

export const ItemTitle = styled(Header5)`
	${({ theme }) => `
		font-weight: ${theme.font.weight.semi};
	`}
`

export const ItemInfo = styled(Header5)`
	${({ theme }) => `
		color: ${theme.color.middleGray};
`}
`

/**
 * Adding Items
 */

interface LineWrapperProps {
	theme: DefaultTheme
	align?: string
}

export const LineWrapper = styled.div`
	${({ theme, align }: LineWrapperProps) => css`
		padding: ${theme.layout.spacing.half};
		text-align: ${align || 'left'};
	`}
`

export const AddButton = styled(Button)`
	${({ theme }) => css`
		margin: 0;
		padding: 0;
		&:hover {
			box-shadow: none;
			color: ${theme.color.darkGray};
		}
	`}
`

export const SearchLabel = styled.label`
	${({ theme }) => css`
		color: ${theme.color.middleGray};
		font-size: ${theme.font.size.h5};
	`}
`

export const SearchInput = styled.input`
	${({ theme }) => css`
		margin-left: ${theme.layout.spacing.half};
		font-size: ${theme.font.size.h5};
		font-weight: ${theme.font.weight.semi};
		position: relative;
	`}
`
