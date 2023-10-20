import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	constructor(private http: HttpClient) { }

	selectedClassName = "";
	selectedStudent = -1;
	classesList: any[] = [];
	studentsList: any[] = [];
	isAdmin = false;

	getClasses() {
		this.http.get<any>('/data/classes', { responseType: 'json' }).subscribe(data => {
			this.studentsList = [];
			this.classesList = data.list;
			this.isAdmin = data.isAdmin;
		});
	}

	getStudents(class_id: number) {
		this.http.post<any>('/data/students', { class_id: class_id }, { responseType: 'json' }).subscribe(data => {
			this.classesList = [];
			this.studentsList = data;
		})

	}

	upsertStudent(
		student_id: number,
		arrived: boolean,
		time_in: string | null,
		time_out: string | null
	) {
		this.http.post<any>('/data/students/upsert', {
			student_id: student_id,
			arrived: arrived ? 1 : 0,
			time_in: time_in,
			time_out: time_out
		}, { responseType: 'json' }).subscribe();
	}

}
