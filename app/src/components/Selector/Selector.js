// @flow
import * as React from 'react'
import type { GetItemPropsReturn } from 'downshift'
import Downshift from 'downshift'
import { LabelWrapper, Wrapper, ItemContainer, Input, MenuWrapper, List, SelectorListItem, MenuArrow, Label } from './styled'

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
	// eslint-disable-next-line
	render?: (SelectorRenderProps) => React.Node,
}

export type SelectorProps = {
	// Downshift props. More are available:
	// https://github.com/paypal/downshift#usage
	selectedItem?: void | string,
	onChange?: ({ value: string }) => void,
	onSelect?: ({ value: string }, {}) => void,
	itemToString?: (SelectorItem) => string,
	// Additional props
	label: string,
	items: Array<SelectorItem>,
	inputFilter?: (input: string) => ({ [key: string]: any }) => boolean,
	disabled?: boolean,
}

/**
 * Selector
 */

const defaultItemToString = (i) => (i ? i.label : '')
const defaultInputFilter = (inputValue) => (item) =>
	!inputValue || inputValue.length < 2 || item.label.toLowerCase().includes(inputValue.toLowerCase())

const getSelectedItemByValue = (value: string, items: Array<SelectorItem>): SelectorItem | void =>
	items.find((i) => i.value === value)
const getSelectedItem = (selectedItem: SelectorItem, items: Array<SelectorItem>): SelectorItem | void => {
	if (!selectedItem) return undefined
	return getSelectedItemByValue(selectedItem.value, items)
}

const stateReducer = (state, changes) => {
	// this prevents the menu from being closed when the user
	// selects an item with a keyboard or mouse

	switch (changes.type) {
		case Downshift.stateChangeTypes.clickItem:
			return {
				...changes,
				inputValue: 'hi',
			}
		default:
			return changes
	}
}

const Selector = ({
	onChange,
	onSelect: passedOnSelect,
	itemToString,
	items,
	label,
	inputFilter,
	disabled,
	selectedItem: controlledSelectedItem,
}: SelectorProps) => {
	const controlledValue =
		controlledSelectedItem !== undefined
			? // If a controlled value is provided, find it in the items.
			  // fall back to 'null' so the component remains controlled
			  getSelectedItemByValue(controlledSelectedItem, items) || null
			: // otherwise, provide 'undefined' so the input remains uncontrolled.
			  undefined

	const onSelect = (selectedItem: any, stateAndHelpers: any) => {
		stateAndHelpers.setState({ inputValue: '' })
		if (passedOnSelect) passedOnSelect(selectedItem, stateAndHelpers)
	}
	return (
		<Downshift
			onChange={onChange}
			onSelect={onSelect}
			stateReducer={stateReducer}
			itemToString={itemToString || defaultItemToString}
			initialSelectedItem={controlledValue}
		>
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
				// clearSelection,
			}) => {
				const filterItems = inputFilter || defaultInputFilter
				const currentItem = getSelectedItem(selectedItem, items)
				const renderItem = ({ render, ...item }: SelectorItem, index: number): React.Node => {
					const itemProps = {
						...getItemProps({
							key: item.value,
							index,
							item,
							highlighted: index === highlightedIndex ? true : undefined,
							selected: item === selectedItem ? true : undefined,
						}),
					}

					return <SelectorListItem {...itemProps}>{render ? render(itemProps) : <span>{item.label}</span>}</SelectorListItem>
				}
				return (
					<div>
						<Wrapper disabled={disabled} isOpen={isOpen}>
							<LabelWrapper {...getLabelProps} onClick={openMenu}>
								<MenuArrow down={isOpen} />
								{currentItem && currentItem.render ? renderItem(currentItem, 0) : <Label {...getLabelProps()}>{label}</Label>}
							</LabelWrapper>
							<MenuWrapper visible={isOpen}>
								<List {...getMenuProps()}>
									{isOpen ? (
										// if nothing is selected, render the input and the filtered items
										<React.Fragment>
											<ItemContainer>
												<Input autoFocus {...getInputProps()} placeholder="start typing.." />
											</ItemContainer>
											{items.filter(filterItems(inputValue)).map(renderItem)}
										</React.Fragment>
									) : null}
								</List>
							</MenuWrapper>
						</Wrapper>
					</div>
				)
			}}
		</Downshift>
	)
}
Selector.defaultProps = {
	selectedItem: undefined,
	itemToString: defaultItemToString,
	inputFilter: defaultInputFilter,
	onChange: () => {},
	onSelect: () => {},
	disabled: false,
}

export default Selector
