import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  classesList: any[] = [];

  getClasses() {
    this.http.get<any>('data/classes', { responseType: 'json' }).subscribe(data => {
      const list = data.list;
      this.classesList = list;
    });
  }

}
