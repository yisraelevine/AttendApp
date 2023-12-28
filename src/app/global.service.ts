import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { getDate } from './get-date'
import { AttendanceRecord, EmployeeInfo, StudentInfo, ClassInfo } from './interfaces'
import { addMissingDates } from './add-missing-dates'

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	selectedClass: ClassInfo = {
		id: -1, name: '', sundays_off: false
	}
	selectedStudent: StudentInfo = {
		id: -1, last_name: '', first_name: '', arrived: null, hidden: false,
		time_in: null, time_out: null, text: null, registration_date: null
	}
	isAdmin = false
	offDates: string[] = []
	classesInfo: ClassInfo[] = []
	studentsInfo: StudentInfo[] = []
	attendanceRecords: AttendanceRecord[] = []
	employeesList: EmployeeInfo[] = []
	componentShown = -1
	constructor(private http: HttpClient) { }
	getClasses() {
		this.http.get<{ isAdmin: boolean, list: ClassInfo[], offDates: string[] }>(
			'/data/classes', { responseType: 'json' }
		).subscribe({
			next: data => {
				this.isAdmin = data.isAdmin
				this.offDates = data.offDates.map(item => new Date(item.slice(0, -1)).toDateString())
				this.classesInfo = data.list
			},
			error: () => this.componentShown = 0,
			complete: () => this.componentShown = 0
		})
	}
	getStudents() {
		this.http.get<StudentInfo[]>('/data/students', {
			params: {
				date: new getDate().jdate,
				class_id: this.selectedClass.id
			},
			responseType: 'json'
		}).subscribe({
			next: data => this.studentsInfo = data,
			error: () => this.componentShown = 1,
			complete: () => this.componentShown = 1
		})
	}
	getEmployees() {
		this.http.get<EmployeeInfo[]>('/data/permissions', {
			params: { class_id: this.selectedClass.id },
			responseType: 'json'
		}).subscribe({
			next: data => this.employeesList = data,
			error: () => this.componentShown = 2,
			complete: () => this.componentShown = 2
		})
	}
	getDates() {
		this.http.get<AttendanceRecord[]>('/data/student', {
			params: { student_id: this.selectedStudent.id },
			responseType: 'json'
		}).subscribe({
			next: data => this.attendanceRecords = addMissingDates(this.selectedStudent.registration_date, data),
			error: () => this.componentShown = 3,
			complete: () => this.componentShown = 3
		})
	}
	upsertStudent(
		date: string | null,
		student_id: number,
		arrived: boolean | null,
		time_in: string | null,
		time_out: string | null,
		text: string | null
	) {
		this.http.put<any>('/data/students/upsert', {
			date: date ? new Date(date).toISOString().split('T')[0] : new getDate().jdate,
			student_id,
			arrived,
			time_in,
			time_out,
			text
		}).subscribe()
	}
}
