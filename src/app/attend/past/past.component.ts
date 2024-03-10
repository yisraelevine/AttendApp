import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'
import { PastRecord, PastMetadata } from '../interfaces'
import { PastRecords } from '../past-records'

@Component({
	selector: 'past',
	templateUrl: './past.component.html',
	styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit {
	hebrew?: boolean
	records?: PastRecords
	metadata?: PastMetadata
	offDates?: string[]
	constructor(private http: HttpClient, private route: ActivatedRoute) { }
	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.http.get<[PastRecord[], [PastMetadata], { date: string }[]]>(
				'/api/attend/past',
				{ params: { studentId: params['studentId'] } }
			).subscribe({
				next: data => {
					this.metadata = data[1][0]
					this.offDates = data[2].map(e => new Date(e.date.slice(0, -1)).toDateString())
					this.records = new PastRecords(data[0], this.metadata?.registrationDate)
				}
			})
		})
	}
	isOffDay = (date: string) => {
		const _date = new Date(date)
		return (_date.getDay() === 0 && this.metadata?.sundaysOff) ||
			this.offDates?.includes(date) || _date.getDay() === 6
	}
}
