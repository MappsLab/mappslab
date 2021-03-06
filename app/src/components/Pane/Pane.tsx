import * as React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { Header1, Header5 } from '../Text'
import { EditableText } from '../Inspector'

interface WrapperProps {
	theme: DefaultTheme
	allowOverflow?: boolean
	size?: string
}

const Wrapper = styled.div`
	${({ allowOverflow }: WrapperProps) => css`
		background-color: white;
		border-radius: 2px;
		position: relative;
		max-height: 95vh;
		${allowOverflow
			? ``
			: `
			overflow: hidden;
		`}
	`};
`

const Title = styled.div`
	${({ theme, size }: WrapperProps) => css`
		border-bottom: 1px solid ${theme.color.darkGray};
		height: ${size === 'full' ? '60px' : '60px'};
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	`};
`

const TitleText = styled.div``

const Content = styled.div`
	${({ theme, size, allowOverflow }: WrapperProps) => css`
		display: flex;
		flex-direction: column;
		justify-content: ${size === 'full' ? 'flex-start' : 'center'};
		padding: ${size === 'small'
			? theme.layout.spacing.single
			: theme.layout.spacing.triple};
		height: ${size === 'full' ? 'calc(85vh - 60px)' : 'auto'};
		min-height: ${size === 'small' ? 'auto' : '300px'};
		width: ${size === 'full' ? '650px' : size === 'small' ? '320px' : '425px'};
		position: relative;
		${allowOverflow
			? ``
			: `
			overflow-x: hidden;
			overflow-y: scroll;
		`}
	`};
`

const TitleIcon = styled(Header1)`
	${({ theme }) => css`
		margin-right: 0.2em;
		font-size: calc(${theme.font.size.h1} + 4px);
		vertical-align: middle;
	`};
`

/**
 * Pane
 */

interface PaneProps {
	title?: string | null
	subtitle?: string | null
	viewerCanEdit?: boolean
	updateTitle?: (args: { [key: string]: any }) => Promise<void>
	icon?: string
	children: React.ReactNode
	titleFieldName?: string
	size: 'small' | 'normal' | 'full'
	allowOverflow: boolean
}

export const Pane = ({
	title,
	subtitle,
	titleFieldName,
	children,
	icon,
	size,
	viewerCanEdit,
	updateTitle,
	allowOverflow,
}: PaneProps) => {
	return (
		<Wrapper size={size} allowOverflow={allowOverflow} className="Pane">
			{title && (
				<Title size={size}>
					{icon && <TitleIcon>{icon}</TitleIcon>}
					<TitleText>
						<EditableText
							name={titleFieldName || 'title'}
							fontSize="h1"
							initialValue={title}
							viewerCanEdit={viewerCanEdit}
							updateFn={updateTitle}
						/>
						{subtitle && <Header5 color="middleGray">{subtitle}</Header5>}
					</TitleText>
				</Title>
			)}
			<Content size={size} allowOverflow={allowOverflow}>
				{children}
			</Content>
		</Wrapper>
	)
}

Pane.defaultProps = {
	title: undefined,
	titleFieldName: 'title',
	subtitle: undefined,
	icon: undefined,
	viewerCanEdit: false,
	updateTitle: undefined,
	allowOverflow: false,
}
