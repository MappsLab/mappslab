export const classroomsQuery = /* GraphQL */ `
	query ClassroomsQuery {
		classrooms {
			edges {
				node {
					__typename
					uid
					title
				}
			}
		}
	}
`
export const studentsQuery = /* GraphQL */ `
	query StudentsQuery {
		students {
			edges {
				node {
					__typename
					uid
					name
				}
			}
		}
	}
`
export const teachersQuery = /* GraphQL */ `
	query TeachersQuery {
		teachers {
			edges {
				node {
					__typename
					uid
					name
				}
			}
		}
	}
`
export const mapsQuery = /* GraphQL */ `
	query MapsQuery {
		maps {
			edges {
				node {
					__typename
					uid
					title
				}
			}
		}
	}
`
