// @flow

import type { PinType } from 'Types'

export type HandlerProps = {
	transition: (string, {}) => void,
	updateMapOptions: ({}) => void,
	pin: PinType,
	activePinUid: null | string,
}
