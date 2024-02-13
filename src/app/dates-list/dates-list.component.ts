import { Component } from '@angular/core'
import { fade } from '../animations'
import { GlobalService } from '../global.service'

@Component({
	selector: 'app-dates-list',
	templateUrl: './dates-list.component.html',
	styleUrls: ['./dates-list.component.css'],
	animations: [fade]
})
export class DatesListComponent {
	animationState = ''
	selected = ''
	timeout: any
	constructor(public service: GlobalService) { }
	backEvent() {
		this.animationState = 'void'
		this.service.getStudents()
	}
	clockEvent(date: string) { this.selected = this.selected === date ? '' : date }
	checkboxEvent(date: string) {
		for (const item of this.service.pastRecords!.records) {
			if (item.date.date !== date) continue
			if (item.time_in === null && item.time_out === null) this.service.upsertStudent(
				date, this.service.selectedStudent.id, item.arrived = !item.arrived, item.time_in, item.time_out, item.text)
			else this.selected = date
			break
		}
	}
	timeEvent(date: string, time: string | null, isTimeIn: boolean) {
		for (const item of this.service.pastRecords!.records) {
			if (item.date.date !== date) continue
			time = time?.length === 0 ? null : time
			isTimeIn ? item.time_in = time : item.time_out = time
			if (time) item.arrived = true
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => this.service.upsertStudent(
				date, this.service.selectedStudent.id, item.arrived, item.time_in, item.time_out, item.text), 200)
			break
		}
	}
	textEvent(date: string, text: string | null) {
		for (const item of this.service.pastRecords!.records) {
			if (item.date.date !== date) continue
			text = text?.length === 0 ? null : text
			item.text = text
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => this.service.upsertStudent(
				date, this.service.selectedStudent.id, item.arrived, item.time_in, item.time_out, item.text), 200)
			break
		}
	}
	isHidden = (date: string) => {
		const _date = new Date(date)
		const registration_date = this.service.selectedStudent.registration_date?.slice(0, -1) || ''
		return (_date.getDay() === 0 && this.service.selectedClass.sundays_off) ||
			this.service.offDates.includes(date) ||
			_date.getDay() === 6 ||
			_date < new Date(registration_date)
	}
}
