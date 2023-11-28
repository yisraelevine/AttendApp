import { Component } from '@angular/core'
import { fade, toggleHeight } from '../animations'
import { GlobalService } from '../global.service'
import { getDate } from '../get-date'

@Component({
	selector: 'app-dates-list',
	templateUrl: './dates-list.component.html',
	styleUrls: ['./dates-list.component.css'],
	animations: [fade, toggleHeight]
})
export class DatesListComponent {
	animationState = ''
	selected = ''
	formatDate = getDate.formatDate
	timeout: any
	isHiddenVar = false
	constructor(public service: GlobalService) { }
	backEvent() {
		this.animationState = 'void'
		this.service.getStudents()
	}
	clockEvent(date: string) { this.selected = this.selected === date ? '' : date }
	checkboxEvent(date: string) {
		for (const item of this.service.attendanceRecords.slice(0, 7)) {
			if (item.date !== date) continue
			if (item.time_in === null && item.time_out === null) this.service.upsertStudent(
				date, this.service.selectedStudent.id, item.arrived = !item.arrived, item.time_in, item.time_out)
			else this.selected = date
			break
		}
	}
	timeEvent(date: string, time: string | null, isTimeIn: boolean) {
		for (const item of this.service.attendanceRecords.slice(0, 7)) {
			if (item.date !== date) continue
			time = time?.length === 0 ? null : time
			isTimeIn ? item.time_in = time : item.time_out = time
			if (time) item.arrived = true
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => this.service.upsertStudent(
				date, this.service.selectedStudent.id, item.arrived, item.time_in, item.time_out), 200)
			break
		}
	}
	isWeekEnd = (date: string) => new Date(date).getDay() === 5
	isHidden = (date: string) => this.isHiddenVar = (new Date(date).getDay() === 0 && this.service.selectedClass.sundays_off)
		|| this.service.classesList.offDates.includes(date)
}
