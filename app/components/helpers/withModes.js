// @flow
import * as React from 'react'

const withModes = (modes) => (Component) => {
	return class extends React.Component<any> {
		handleEvent = () => {}

		render() {
			return <Component modes={modes} {...this.props} />
		}
	}
}

export default withModes
