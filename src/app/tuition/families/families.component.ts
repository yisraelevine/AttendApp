import { Component, OnInit } from '@angular/core'
import { Family } from '../interfaces'
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'families',
	templateUrl: './families.component.html',
	styleUrls: ['./families.component.css']
})
export class FamiliesComponent implements OnInit {
	records?: Family[]
	constructor(private http: HttpClient) { }
	ngOnInit() {
		this.http.get<Family[]>(
			'/api/tuition/families'
		).subscribe({
			next: data => this.records = data
		})
	}
}
