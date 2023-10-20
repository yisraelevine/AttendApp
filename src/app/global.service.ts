/* eslint-disable @typescript-eslint/no-explicit-any */
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

}
