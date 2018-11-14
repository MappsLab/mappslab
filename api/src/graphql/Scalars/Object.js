// @flow

import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import Json5 from 'json5'

const toObject = (value) => {
	if (typeof value === 'object') {
		return value
	}
	if (typeof value === 'string' && value.charAt(0) === '{') {
		return Json5.parse(value)
	}
	return null
}

const parseAst = (ast) => {
	switch (ast.kind) {
		case Kind.STRING:
		case Kind.BOOLEAN:
			return ast.value
		case Kind.INT:
		case Kind.FLOAT:
			return parseFloat(ast.value)
		case Kind.OBJECT:
			/* eslint-disable-next-line no-use-before-define */
			return parseObject(ast)
		case Kind.LIST:
			return ast.values.map(parseAst)
		default:
			return null
	}
}

const parseObject = (ast) => {
	const value = Object.create(null)
	ast.fields.forEach((field) => {
		value[field.name.value] = parseAst(field.value)
	})
	return value
}

export default new GraphQLScalarType({
	name: 'Object',
	description: 'Represents an arbitrary object.',
	parseValue: toObject,
	serialize: toObject,
	parseLiteral(ast) {
		switch (ast.kind) {
			case Kind.STRING:
				return ast.value.charAt(0) === '{' ? Json5.parse(ast.value) : null
			case Kind.OBJECT:
				return parseObject(ast)
			default:
				return null
		}
	},
})
