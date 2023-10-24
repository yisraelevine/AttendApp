import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDate } from './get-date';

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
	isAdmin = false;

	getClasses() {
		this.http.get<any>(
			'/data/classes',
			{
				responseType: 'json'
			}
		).subscribe({
			next: (data: any) => {
				this.classesList = data.list;
				this.isAdmin = data.isAdmin;
			},
			error: () => {
				this.studentsList = [];
				this.permissionsList = [];
			},
			complete: () => {
				this.studentsList = [];
				this.permissionsList = [];
			}
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
			error: () => this.classesList = [],
			complete: () => this.classesList = []
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
			error: () => this.classesList = [],
			complete: () => this.classesList = []
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
