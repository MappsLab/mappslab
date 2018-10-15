// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { GetItemPropsReturn } from 'downshift'
import Downshift from 'downshift'

const LabelWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`

const Wrapper = styled.div`
	${({ theme }) => `
		outline: 1px solid gray;
		border-radius: 3px;
		height: 35px;
		width: 100%;
		margin: 0 auto;
		position: relative;
	`};
`

const Input = styled.input`
	outline: 1px solid blue;
	padding: 5px 10px;
	width: 100%;
	height: 100%;
`

const MenuWrapper = styled.div`
	${({ visible }) => `
		display: ${visible ? 'block' : 'none'};
		position: absolute;
		width: 100%;
		top: 100%;
		margin: 0;
		outline: 1px solid gray;
		list-style: none;
		max-height: 190px;
		overflow-y: scroll;
		padding: 0;
		outline: 1px solid gray;
	`};
`

const Ul = styled.ul`
	${() => `
		width: 100%;
		margin: 0;
		list-style: none;
		max-height: 190px;
		overflow-y: scroll;
		padding: 0;
	`};
`

const SelectorListItem = styled.li`
	${({ highlighted, selected }) => `
		background-color: ${highlighted ? 'pink' : 'initial'};
		color: ${selected ? 'purple' : 'black'};
		cursor: pointer;
		padding: 2px;
	`};
`

export type SelectorRenderProps = GetItemPropsReturn & {
	onMouseMove: (e: SyntheticEvent<Element>) => void,
	onMouseDown: (e: SyntheticEvent<Element>) => void,
	onPress: (e: SyntheticEvent<Element>) => void,
	onClick: (e: SyntheticEvent<Element>) => void,
	id: string,
	role: 'option',
	'aria-selected': boolean,
	highlighted: boolean,
	selected: boolean,
	label: string,
}

export type SelectorItem = {
	value: string,
	label: string,
	render?: (SelectorRenderProps) => React.Node,
}

export type SelectorProps = {
	// value: string,
	onChange: (string) => void,
	// onInputValueChange: (string) => void,
	label: string,
	items: Array<SelectorItem>,
	itemToString?: (SelectorItem) => string,
	inputFilter?: (input: string) => ({ [key: string]: any }) => boolean,
}

/**
 * Selector
 */

const defaultItemToString = (i) => (i ? i.label : '')
const defaultInputFilter = (inputValue) => (item) =>
	!inputValue || !inputValue.length < 2 || item.label.toLowerCase().includes(inputValue.toLowerCase())

const Selector = ({ label, items, itemToString, inputFilter, ...props }: SelectorProps) => {
	const filterItems = inputFilter || defaultInputFilter
	return (
		<Downshift {...props} itemToString={itemToString || defaultItemToString}>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				inputValue,
				highlightedIndex,
				selectedItem,
				openMenu,
				clearSelection,
			}) => {
				const currentItem = selectedItem ? items.find((i) => i.value === selectedItem.value) : null
				return (
					<div>
						<Wrapper>
							<LabelWrapper {...getLabelProps} onClick={openMenu}>
								{currentItem && currentItem.render ? (
									currentItem.render({ selected: true })
								) : (
									<label {...getLabelProps}>{label}</label>
								)}
							</LabelWrapper>
							<MenuWrapper visible={isOpen}>
								<Ul {...getMenuProps()}>
									{isOpen && selectedItem === null ? (
										// if nothing is selected, render the input and the filtered items
										<React.Fragment>
											<Input autoFocus {...getInputProps()} placeholder="start typing.." />
											{items.filter(filterItems(inputValue)).map(({ render, ...item }, index) => {
												const itemProps = {
													...getItemProps({
														key: item.value,
														index,
														item,
														highlighted: index === highlightedIndex ? true : undefined,
														selected: item === selectedItem ? true : undefined,
													}),
												}
												return (
													<SelectorListItem {...itemProps}>
														{render ? render(itemProps) : <span>{item.label}</span>}
													</SelectorListItem>
												)
											})}
										</React.Fragment>
									) : (
										// otherwise, render a 'clear' button
										<button
											type="button"
											onClick={() => {
												clearSelection()
												openMenu()
											}}
										>
											clear
										</button>
									)}
								</Ul>
							</MenuWrapper>
						</Wrapper>
					</div>
				)
			}}
		</Downshift>
	)
}

Selector.defaultProps = {
	itemToString: defaultItemToString,
	inputFilter: defaultInputFilter,
}

export default Selector
