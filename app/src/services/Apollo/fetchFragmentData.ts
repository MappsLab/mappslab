import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs'
/**
 * Adapted from:
 * https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
 */

fetch(`http://localhost:3000/`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		variables: {},
		operationName: '',
		query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
	}),
})
	.then((result) => result.json())
	.then((result) => {
		// here we're filtering out any type information unrelated to unions or interfaces
		const filteredData = result.data.__schema.types.filter(
			(type) => type.possibleTypes !== null,
		)
		result.data.__schema.types = filteredData
		const filePath = path.resolve(__dirname, 'fragmentTypes.json')
		fs.writeFile(filePath, JSON.stringify(result.data), (err) => {
			if (err) {
				console.error('Error writing fragmentTypes file', err)
			} else {
				console.log('Fragment types successfully extracted!')
			}
		})
	})
