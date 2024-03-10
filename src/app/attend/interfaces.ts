export interface Record {
	arrived: boolean | null
	timeIn: string | null
	timeOut: string | null
	text: string | null
}

export interface Class {
	id: number
	name: string
}
export interface Employee {
	id: number
	email: string
}
export interface Student extends Record {
	id: number
	lastName: string
	firstName: string
	hidden: boolean
}
export interface PastRecord extends Record {
	date: string
}
export interface PastMetadata {
	lastName: string,
	firstName: string,
	registrationDate: string,
	sundaysOff: boolean
}
export interface StudentMetadata {
	name: string
}