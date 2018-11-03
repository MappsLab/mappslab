// @flow
import React from 'react'
import styled from 'styled-components'

const LoadingWrapper = styled.div``

type Props = {
	text?: string,
}

export const Loading = ({ text }: Props) => <LoadingWrapper>{text}</LoadingWrapper>

Loading.defaultProps = {
	text: 'Loading...',
}
