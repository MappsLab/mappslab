import ObjectScalarTypeResolver from './Object'

export const scalarTypes = /* GraphQL */ `
	scalar Object
`

export const scalarResolvers = {
	Object: ObjectScalarTypeResolver,
}
