// @flow
import React from 'react'
import Downshift from 'downshift'
import { ClassroomsQuery } from 'Queries'

/**
 * Sandbox
 */

type BaseProps = {
	initialValue?: string,
	items: Array<{}>,
}

type State = {
	inputValue?: null | string,
}
// const Sandbox = (props: Props) => {
// 	return (
// 	)
// }
class TypeAhead extends React.Component<BaseProps, State> {
	static defaultProps = {
		initialValue: '',
	}

	state = {
		inputValue: this.props.initialValue || '',
	}

	onChange = (e) => {
		const inputValue = e.target.value
		this.setState({
			inputValue,
		})
	}

	render() {
		const { items } = this.props
		const { inputValue } = this.state
		return (
			<div>
				<p>Classrooms</p>
				{items.map((v) => (
					<p key={v.uid}>{v.title}</p>
				))}
				<Downshift itemToString={(i) => (i ? i.uid : '')}>
					{({ getInputProps, getItemProps, getLabelProps, getMenuProps, isOpen, inputValue, highlightedIndex, selectedItem }) => (
						<div>
							<label {...getLabelProps()}>Pick Your Classroom</label>
							<input {...getInputProps()} />
							<ul {...getMenuProps()}>
								{isOpen
									? items
											.filter((i) => !inputValue || i.title.includes(inputValue)) // filter
											.map((item, index) => (
												<li
													{...getItemProps({
														key: item.uid,
														index,
														item,
													})}
												>
													{item.title}
												</li>
											))
									: null}
							</ul>
						</div>
					)}
				</Downshift>
			</div>
		)
	}
}

type WrapperProps = BaseProps & {
	initialVariables?: {},
}

export default ({ initialVariables, ...props }: WrapperProps) => (
	<ClassroomsQuery variables={initialVariables}>
		{({ refetch, data }) => <TypeAhead refetch={refetch} items={data.classrooms} {...props} />}
	</ClassroomsQuery>
)
