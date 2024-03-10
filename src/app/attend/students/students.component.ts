import { Component, OnInit } from '@angular/core'
import { AttendService } from '../attend.service'
import { toggleHeight } from '../../animations'
import { ActivatedRoute } from '@angular/router'
import { Student, StudentMetadata } from '../interfaces'
import { HttpClient } from '@angular/common/http'
import { getDate } from 'src/app/get-date'

@Component({
	selector: 'students',
	templateUrl: './students.component.html',
	styleUrls: ['./students.component.css'],
	animations: [toggleHeight]
})
export class StudentsListComponent implements OnInit {
	records?: Student[]
	metadata?: StudentMetadata
	selected = -1
	timeout: any
	constructor(private service: AttendService, private route: ActivatedRoute, private http: HttpClient) { }
	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.http.get<[Student[], [StudentMetadata]]>(
				'/api/attend/students',
				{ params: { date: new getDate().date, classId: params['classId'] } }
			).subscribe({
				next: data => {
					this.records = data[0]
					this.metadata = data[1][0]
				}
			})
		})
	}
	toggleEvent(id: number) { this.selected = this.selected === id ? -1 : id }
	checkboxEvent(studentId: number) {
		for (const item of this.records!) {
			if (item.id !== studentId) continue
			if (item.timeIn === null && item.timeOut === null) this.service.upsertStudent(
				null, item.id, item.arrived = !item.arrived, item.timeIn, item.timeOut, item.text)
			else this.selected = item.id
			break
		}
	}
	timeEvent(studentId: number, time: string | null, isTimeIn: boolean) {
		for (const item of this.records!) {
			if (item.id !== studentId) continue
			time = time?.length === 0 ? null : time
			isTimeIn ? item.timeIn = time : item.timeOut = time
			if (time) item.arrived = true
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => this.service.upsertStudent(
				null, item.id, item.arrived, item.timeIn, item.timeOut, item.text), 200)
			break
		}
	}
	textEvent(studentId: number, text: string | null) {
		for (const item of this.records!) {
			if (item.id !== studentId) continue
			text = text?.length === 0 ? null : text
			item.text = text
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => this.service.upsertStudent(
				null, item.id, item.arrived, item.timeIn, item.timeOut, item.text), 200)
			break
		}
	}
}
