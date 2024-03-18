import { Component, OnInit } from '@angular/core'
import { Period, PeriodMetadata } from '../interfaces'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'periods',
	templateUrl: './periods.component.html',
	styleUrls: ['./periods.component.css']
})
export class PeriodsComponent implements OnInit {
	records?: Period[]
	metadata?: PeriodMetadata
	constructor(private route: ActivatedRoute, private http: HttpClient) { }
	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.http.get<[Period[], [PeriodMetadata]]>(
				'/api/tuition/periods',
				{ params: { familyId: params['familyId'] } }
			).subscribe({
				next: data => {
					this.records = data[0]
					this.metadata = data[1][0]
				}
			})
		})
	}
}
