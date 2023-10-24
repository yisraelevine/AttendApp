import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDate } from './get-date';
interface classesListInterface {
	isAdmin: boolean;
	list: {
		id: number;
		name: string;
	}[];
}
interface permissionsListInterface {
	id: number;
	email: string;
}
@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	constructor(private http: HttpClient) { }

	selectedClassName = "";
	selectedStudent = -1;
	classesList: any[] = [];
	studentsList: any[] = [];
	permissionsList: any[] = [];
	componentShown = -1;
	isAdmin = false;

	getClasses() {
		this.http.get<classesListInterface>(
			'/data/classes',
			{
				responseType: 'json'
			}
		).subscribe({
			next: (data) => {
				this.classesList = data.list;
				this.isAdmin = data.isAdmin;
			},
			error: () => this.componentShown = 0,
			complete: () => this.componentShown = 0
		});
	}

	getPermissions(class_id: number) {
		this.http.post<any>(
			'/data/permissions',
			{
				class_id: class_id
			},
			{
				responseType: 'json'
			}
		).subscribe({
			next: (data: any) => {
				this.permissionsList = data;
			},
			error: () => this.componentShown = 2,
			complete: () => this.componentShown = 2
		});
	}

	getStudents(class_id: number) {
		this.http.post<any>(
			'/data/students',
			{
				date: new getDate().jdate,
				class_id: class_id
			},
			{
				responseType: 'json'
			}
		).subscribe({
			next: (data: any) => this.studentsList = data,
			error: () => this.componentShown = 1,
			complete: () => this.componentShown = 1
		})

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
