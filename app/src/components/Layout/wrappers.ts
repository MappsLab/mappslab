import styled from 'styled-components'

export const Centered = styled.div`
	${({ theme }) => `
		position: absolute;
		z-index: ${theme.layout.z.modal};
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	`};
`
