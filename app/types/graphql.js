// @flow

type MutationOptions = {
	variables: {},
	// refetchQueries:
	// optimisticResponse:
	// update:
}

export type Mutation = (options?: MutationOptions) => Promise<void>
