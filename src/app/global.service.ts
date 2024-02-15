import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { getDate } from './get-date'
import { AttendanceRecord, EmployeeInfo, StudentInfo, ClassInfo } from './interfaces'
import { PastRecords } from './past-records'

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	selectedClass: ClassInfo = {
		id: -1, name: '', sundaysOff: false
	}
	selectedStudent: StudentInfo = {
		id: -1, lastName: '', firstName: '', arrived: null, hidden: false,
		timeIn: null, timeOut: null, text: null, registrationDate: null
	}
	isAdmin = false
	offDates: string[] = []
	classesInfo: ClassInfo[] = []
	studentsInfo: StudentInfo[] = []
	pastRecords?: PastRecords
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
				classId: this.selectedClass.id
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
			params: { classId: this.selectedClass.id },
			responseType: 'json'
		}).subscribe({
			next: data => this.employeesList = data,
			error: () => this.componentShown = 2,
			complete: () => this.componentShown = 2
		})
	}
	getDates() {
		this.http.get<AttendanceRecord[]>('/data/student', {
			params: { studentId: this.selectedStudent.id },
			responseType: 'json'
		}).subscribe({
			next: data => this.pastRecords = new PastRecords(data, this.selectedStudent.registrationDate),
			error: () => this.componentShown = 3,
			complete: () => this.componentShown = 3
		})
	}
	upsertStudent(
		date: string | null,
		studentId: number,
		arrived: boolean | null,
		timeIn: string | null,
		timeOut: string | null,
		text: string | null
	) {
		this.http.put<any>('/data/students/upsert', {
			date: date ? new Date(date).toISOString().split('T')[0] : new getDate().jdate,
			studentId,
			arrived,
			timeIn,
			timeOut,
			text
		}).subscribe()
	}
}
