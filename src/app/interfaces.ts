export interface ClassInfo {
	id: number
	name: string
	sundaysOff: boolean
}
export interface EmployeeInfo {
	id: number
	email: string
}
export interface StudentInfo {
	id: number
	lastName: string
	firstName: string
	hidden: boolean
	arrived: boolean | null
	timeIn: string | null
	timeOut: string | null
	text: string | null
	registrationDate: string | null
}
export interface AttendanceRecord {
	date: string
	arrived: boolean | null
	timeIn: string | null
	timeOut: string | null
	text: string | null
}
