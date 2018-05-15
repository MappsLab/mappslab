import ObjectScalarTypeResolver from './Object'

const scalarTypes = /* GraphQL */ `
	scalar Object
`

const scalarResolvers = {
	Object: ObjectScalarTypeResolver,
}

module.exports = { scalarTypes, scalarResolvers }
