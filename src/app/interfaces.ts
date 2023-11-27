export interface ClassInfo {
	id: number
	name: string
	sundays_off: boolean
}
export interface classesList {
	isAdmin: boolean
	list: ClassInfo[]
	offDates: string[]
}
export interface EmployeeInfo {
	id: number
	email: string
}
export interface StudentInfo {
	id: number
	last_name: string
	first_name: string
	arrived: boolean | null
	time_in: string | null
	time_out: string | null
	hidden: boolean
}
export interface AttendanceRecord {
	date: string
	student_id: number
	arrived: boolean | null
	time_in: string | null
	time_out: string | null
}
