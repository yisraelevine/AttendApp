import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDate } from './get-date';
import { classesList, AttendanceRecord, EmployeeInfo, StudentInfo } from './interfaces'
import { AddMissingDates } from './add-missing-dates';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	constructor(private http: HttpClient) { }

	selected = {
		student: {
			id: -1,
			name: ''
		},
		class: {
			id: -1,
			name: ''
		}
	}
	classesList: classesList = { isAdmin: false, list: [], offDates: [] };
	studentsInfo: StudentInfo[] = [];
	attendanceRecords: AttendanceRecord[] = [];
	permissionsList: EmployeeInfo[] = [];
	componentShown = -1;

	getClasses() {
		this.http.get<classesList>(
			'/data/classes',
			{
				responseType: 'json'
			}
		).subscribe({
			next: data => this.classesList = data,
			error: () => this.componentShown = 0,
			complete: () => this.componentShown = 0
		});
	}

	getStudents(class_id: number) {
		this.http.get<StudentInfo[]>(
			'/data/students',
			{
				params: {
					date: new getDate().jdate,
					class_id
				},
				responseType: 'json'
			}
		).subscribe({
			next: data => {
				this.studentsInfo = data;
				this.selected.class.id = class_id;
			},
			error: () => this.componentShown = 1,
			complete: () => this.componentShown = 1
		})
	}

	getPermissions(class_id: number) {
		this.http.get<EmployeeInfo[]>(
			'/data/permissions',
			{
				params: {
					class_id
				},
				responseType: 'json'
			}
		).subscribe({
			next: data => this.permissionsList = data,
			error: () => this.componentShown = 2,
			complete: () => this.componentShown = 2
		});
	}

	getDates(student_id: number) {
		this.http.get<AttendanceRecord[]>(
			'/data/student',
			{
				params: {
					student_id
				},
				responseType: 'json'
			}
		).subscribe({
			next: data => {
				this.selected.student.id = student_id;
				this.attendanceRecords = AddMissingDates.addMissingDates(data, student_id);
			},
			error: () => this.componentShown = 3,
			complete: () => this.componentShown = 3
		})
	}

	upsertStudent(
		date: string | null,
		student_id: number,
		arrived: boolean,
		time_in: string | null,
		time_out: string | null
	) {
		this.http.put<any>(
			'/data/students/upsert',
			{
				date: date ?? new getDate().jdate,
				student_id,
				arrived: arrived ? 1 : 0,
				time_in,
				time_out
			},
			{
				responseType: 'json'
			}
		).subscribe();
	}

	sundaysOff(): boolean {
		return this.classesList.list.find(item => item.id === this.selected.class.id)?.sundays_off ?? false
	}
}
