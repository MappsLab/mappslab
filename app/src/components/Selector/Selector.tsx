import * as React from 'react'
import Downshift from 'downshift'
import {
	LabelWrapper,
	Wrapper,
	ItemContainer,
	Input,
	MenuWrapper,
	List,
	SelectorListItem,
	MenuArrow,
	Label,
} from './styled'

export interface SelectorRenderProps {
	onMouseMove: (e: React.SyntheticEvent<Element>) => void
	onMouseDown: (e: React.SyntheticEvent<Element>) => void
	onPress: (e: React.SyntheticEvent<Element>) => void
	onClick: (e: React.SyntheticEvent<Element>) => void
	id: string
	role: 'option'
	'aria-selected': boolean
	highlighted: boolean
	selected: boolean
	label: string
}

type SelectorItemType = {
	value: string
	label: string
	render?: (props: SelectorRenderProps) => React.ReactNode
}

export type SelectorProps = {
	// Downshift props. More are available:
	// https://github.com/paypal/downshift#usage
	selectedItem?: void | string
	onChange?: ({ value: string }) => void
	onSelect?: ({ value: string }, {}) => void
	itemToString?: (item: SelectorItemType) => string
	// Additional props
	label: string
	items: Array<SelectorItemType>
	inputFilter?: (input: string) => (value: { [key: string]: any }) => boolean
	disabled?: boolean
}

/**
 * Selector
 */

const defaultItemToString = (item: SelectorItemType) => (item ? item.label : '')
const defaultInputFilter = (inputValue: string) => (item: SelectorItemType) =>
	!inputValue ||
	inputValue.length < 2 ||
	item.label.toLowerCase().includes(inputValue.toLowerCase())

const getSelectedItemByValue = (
	value: string,
	items: Array<SelectorItemType>,
): SelectorItemType | void => items.find((i) => i.value === value)
const getSelectedItem = (
	selectedItem: SelectorItemType,
	items: SelectorItemType[],
): SelectorItemType | void => {
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

export const Selector = ({
	onChange,
	onSelect: passedOnSelect,
	itemToString,
	items,
	label,
	inputFilter,
	disabled,
	selectedItem: controlledSelectedItem,
}: SelectorProps) => {
	const controlledValue = controlledSelectedItem
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
				const renderItem = (
					{ render, ...item }: SelectorItemType,
					index: number,
				): React.ReactNode => {
					const itemProps = {
						...getItemProps({
							key: item.value,
							index,
							item,
							// highlightedIndex: index === highlightedIndex ? true : undefined,
							selected: item === selectedItem ? true : undefined,
						}),
					}

					return (
						<SelectorListItem {...itemProps}>
							{render ? render(itemProps) : <span>{item.label}</span>}
						</SelectorListItem>
					)
				}
				return (
					<div>
						<Wrapper disabled={disabled} isOpen={isOpen}>
							<LabelWrapper {...getLabelProps} onClick={openMenu}>
								<MenuArrow down={isOpen} />
								{currentItem && currentItem.render ? (
									renderItem(currentItem, 0)
								) : (
									<Label {...getLabelProps()}>{label}</Label>
								)}
							</LabelWrapper>
							<MenuWrapper visible={isOpen}>
								<List {...getMenuProps()}>
									{isOpen ? (
										// if nothing is selected, render the input and the filtered items
										<React.Fragment>
											<ItemContainer>
												<Input
													autoFocus
													{...getInputProps()}
													placeholder="start typing.."
												/>
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
