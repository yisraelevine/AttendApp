import { Component, OnInit } from '@angular/core'
import { Class } from '../interfaces'
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'classes',
	templateUrl: './classes.component.html',
	styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
	records?: Class[]
	constructor(private http: HttpClient) { }
	ngOnInit() {
		this.http.get<Class[]>(
			'/api/attend/classes'
		).subscribe({
			next: data => this.records = data
		})
	}
}
