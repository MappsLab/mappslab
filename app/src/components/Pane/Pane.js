// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header1, Header5 } from 'Components/Text'
import { EditableText } from 'Components/Inspector'

const Wrapper = styled.div`
	${({ theme, allowOverflow }) => `
		background-color: white;
		box-shadow: ${theme.mixins.boxShadow.heavy};
		border-radius: 2px;
		border: 1px solid ${theme.color.darkGray};
		position: relative;
		max-height: 95vh;
		${
			allowOverflow
				? ``
				: `
			overflow: hidden;
		`
		}
	`};
`

const Title = styled.div`
	${({ theme, size }) => `
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
	${({ theme, size, allowOverflow }) => `
		display: flex;
		flex-direction: column;
		justify-content: ${size === 'full' ? 'flex-start' : 'center'};
		padding: ${size === 'small' ? theme.layout.spacing.single : theme.layout.spacing.triple};
		height: ${size === 'full' ? 'calc(85vh - 60px)' : 'auto'};
		min-height: ${size === 'small' ? 'auto' : '300px'};
		width: ${size === 'full' ? '650px' : size === 'small' ? '320px' : '425px'};
		position: relative;
		${
			allowOverflow
				? ``
				: `
			overflow-x: hidden;
			overflow-y: scroll;
		`
		}
	`};
`

const TitleIcon = styled(Header1)`
	${({ theme }) => `
		margin-right: 0.2em;
		font-size: calc(${theme.font.size.h1} + 4px);
		vertical-align: middle;
	`};
`

/**
 * Pane
 */

type Props = {
	title?: string,
	viewerCanEdit?: boolean,
	updateTitle?: ({ [key: string]: any }) => Promise<void>,
	subtitle?: string,
	icon?: string,
	children: React.Node,
	titleFieldName?: string,
	size: 'small' | 'normal' | 'full',
	allowOverflow: boolean,
}

const Pane = ({ title, subtitle, titleFieldName, children, icon, size, viewerCanEdit, updateTitle, allowOverflow }: Props) => {
	return (
		<Wrapper size={size} allowOverflow={allowOverflow}>
			{title && (
				<Title size={size}>
					{icon && <TitleIcon>{icon}</TitleIcon>}
					<TitleText>
						<EditableText
							name={titleFieldName || 'title'}
							size="h1"
							initialValue={title}
							viewerCanEdit={viewerCanEdit}
							updateFn={updateTitle}
						/>
						{subtitle && <Header5 color="middleGray">{subtitle}</Header5>}
					</TitleText>
				</Title>
			)}
			<Content direction="column" size={size} allowOverflow={allowOverflow}>
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

export default Pane
