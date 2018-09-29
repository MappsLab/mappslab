// @flow
import type { UserType } from 'Types/UserTypes'
import type { Success } from 'Types/sharedTypes'
import type { RemovePinInput } from 'Types/PinTypes'
import { query, mutateNode } from 'Database'
import { UserError } from 'Errors'
import { clean, validateUpdate } from './pinDBSchema'

export const deletePin = async ({ uid }: RemovePinInput, viewer: UserType): Promise<Success> => {
	// Make sure the user owns the pin (skip if viewer is admin)
	const filter = viewer.roles.includes('admin') ? '' : `@filter(uid_in(~pinned, ${viewer.uid}))`
	const q = /* GraphQL */ `
		query getPin {
			getPin(func: uid(${uid})) ${filter} {
				uid
				title
				has_pin: ~has_pin {
					uid
				}
				pinned: ~pinned {
					uid
				}
			}
		}
	`
	const result = await query(q)
	if (!result || (!result.getPin.length && !viewer.roles.includes('admin'))) {
		throw new UserError('You can only remove pins that you own')
	}

	const pin = result.getPin[0]

	// const pinnedRelationships = result.getPin["~pinned"]
	// const hasPinRelationships = pin.has_pin.map((fromNode) => ({ fromUid: fromNode.uid, pred: 'has_pin', toUid: uid }))
	// const pinnedRelationships = pin.pinned.map((fromNode) => ({ fromUid: fromNode.uid, pred: 'pinned', toUid: uid }))

	const cleaned = await clean({ deleted: true })
	const validatedPinData = await validateUpdate(cleaned)
	const mutationResult = await mutateNode(pin.uid, validatedPinData)
	// const mutationResult = await removeNodeWithEdges(uid, [...hasPinRelationships, ...pinnedRelationships])
	return {
		success: mutationResult,
		messages: [],
	}
}
