import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDate } from './get-date';
import { classesListInterface, datesListInterface, permissionsListInterface, studentsListInterface } from './interfaces'
import { AddMissingDates } from './add-missing-dates';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	constructor(private http: HttpClient) { }

	selectedClassName = "";
	selectedStudentName = "";
	selectedStudentId = -1;
	selectedClassId = -1;
	classesList: classesListInterface = { isAdmin: false, list: [] };
	studentsList: studentsListInterface[] = [];
	datesList: datesListInterface[] = [];
	permissionsList: permissionsListInterface[] = [];
	componentShown = -1;

	getClasses() {
		this.http.get<classesListInterface>(
			'/data/classes',
			{
				responseType: 'json'
			}
		).subscribe({
			next: (data) => this.classesList = data,
			error: () => this.componentShown = 0,
			complete: () => this.componentShown = 0
		});
	}

	getStudents(class_id: number) {
		this.http.get<studentsListInterface[]>(
			'/data/students',
			{
				params: {
					date: new getDate().jdate,
					class_id: class_id
				},
				responseType: 'json'
			}
		).subscribe({
			next: (data) => {
				this.studentsList = data;
				this.selectedClassId = class_id;
			},
			error: () => this.componentShown = 1,
			complete: () => this.componentShown = 1
		})
	}

	getPermissions(class_id: number) {
		this.http.get<permissionsListInterface[]>(
			'/data/permissions',
			{
				params: {
					class_id: class_id
				},
				responseType: 'json'
			}
		).subscribe({
			next: (data) => this.permissionsList = data,
			error: () => this.componentShown = 2,
			complete: () => this.componentShown = 2
		});
	}

	getDates(student_id: number) {
		this.http.get<datesListInterface[]>(
			'/data/student',
			{
				params: {
					student_id: student_id
				},
				responseType: 'json'
			}
		).subscribe({
			next: (data) => {
				this.selectedStudentId = student_id;
				this.datesList = new AddMissingDates(data, student_id).addMissingDates();
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
				student_id: student_id,
				arrived: arrived ? 1 : 0,
				time_in: time_in,
				time_out: time_out
			},
			{
				responseType: 'json'
			}
		).subscribe();
	}

	sundaysOff(): boolean {
		return this.classesList.list.find(item => item.id === this.selectedClassId)?.sundays_off ?? false
	}
}
