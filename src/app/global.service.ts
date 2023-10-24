import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDate } from './get-date';
interface classesListInterface {
	isAdmin: boolean,
	list: {
		id: number,
		name: string
	}[]
};
interface permissionsListInterface {
	id: number,
	email: string
};
interface studentsListInterface {
	id: number,
	last_name: string,
	first_name: string,
	visible: boolean,
	arrived: boolean | null,
	time_in: string | null,
	time_out: string | null
};
@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	constructor(private http: HttpClient) { }

	selectedClassName = "";
	selectedStudent = -1;
	classesList: classesListInterface = { isAdmin: false, list: [] };
	studentsList: studentsListInterface[] = [];
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
		this.http.post<studentsListInterface[]>(
			'/data/students',
			{
				date: new getDate().jdate,
				class_id: class_id
			},
			{
				responseType: 'json'
			}
		).subscribe({
			next: (data) => this.studentsList = data,
			error: () => this.componentShown = 1,
			complete: () => this.componentShown = 1
		})

	}

	getPermissions(class_id: number) {
		this.http.post<permissionsListInterface[]>(
			'/data/permissions',
			{
				class_id: class_id
			},
			{
				responseType: 'json'
			}
		).subscribe({
			next: (data) => this.permissionsList = data,
			error: () => this.componentShown = 2,
			complete: () => this.componentShown = 2
		});
	}

	upsertStudent(
		student_id: number,
		arrived: boolean,
		time_in: string | null,
		time_out: string | null
	) {
		this.http.put<any>(
			'/data/students/upsert',
			{
				date: new getDate().jdate,
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

}
