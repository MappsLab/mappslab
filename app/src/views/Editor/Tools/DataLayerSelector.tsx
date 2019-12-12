import * as React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { unwindEdges } from '@good-idea/unwind-edges'
import { DataLayerSelectorPane } from './Toolbar'
import { ToolsProps } from './Tools'
import { Header5 } from '../../../components/Text'

const LayerButton = styled.button`
	display: flex;
	justify-content: flex-start;
	align-items: flex-center;
`

interface DotProps {
	theme: DefaultTheme
	enabled: boolean
}

const Dot = styled.div`
	${({ theme, enabled }: DotProps) => css`
		width: 16px;
		height: 16px;
		margin-right: 5px;
		border: 2px solid ${theme.color.primary.accent};
		border-radius: 10px;
		background-color: ${enabled ? theme.color.primary.normal : theme.color.primary.muted};
	`}
`

export const DataLayerSelector = (props: ToolsProps) => {
	const { enableLayer, enabledLayers, disableLayer } = props
	const [layers] = unwindEdges(props.mapData.dataLayers)
	const validLayers = layers.filter((l) => /\.kml$/.test(l.url))

	const toggle = (uid: string) => () => {
		if (enabledLayers.includes(uid)) {
			disableLayer(uid)
		} else {
			enableLayer(uid)
		}
	}

	return (
		<DataLayerSelectorPane>
			<Header5 color="gray">Layers</Header5>
			<hr />
			{validLayers.map((layer) => (
				<LayerButton onClick={toggle(layer.uid)} key={layer.uid}>
					<Dot enabled={enabledLayers.includes(layer.uid)} />
					<Header5 color={enabledLayers.includes(layer.uid) ? 'gray' : 'middleGray'}>{layer.title}</Header5>
				</LayerButton>
			))}
		</DataLayerSelectorPane>
	)
}
