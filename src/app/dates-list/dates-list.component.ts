import { Component } from '@angular/core'
import { fade, toggleHeight } from '../animations'
import { GlobalService } from '../global.service'
import { toDate } from '../get-date'

@Component({
	selector: 'app-dates-list',
	templateUrl: './dates-list.component.html',
	styleUrls: ['./dates-list.component.css'],
	animations: [fade, toggleHeight]
})
export class DatesListComponent {
	animationState = ''
	selected = ''
	toDate = toDate
	timeoutIn: any
	timeoutOut: any
	sundaysOff = this.service.sundaysOff()
	isHiddenVar = false
	constructor(public service: GlobalService) { }
	backIconEvent() {
		this.animationState = 'void'
		this.service.getStudents(this.service.selected.class.id)
	}
	clockIconEvent(date: string) {
		this.selected = this.selected === date ? '' : date
	}
	isWeekEnd(date: string): boolean {
		return new Date(date).getDay() === 4
	}
	isHidden(date: string): boolean {
		this.isHiddenVar = (new Date(date).getDay() === 6 && this.sundaysOff) || this.service.classesList.offDates.includes(date)
		return this.isHiddenVar
	}
	checkboxEvent(date: string) {
		const i = this.findDate(date)
		const item = this.service.attendanceRecords[i]
		if (item.time_in === null && item.time_out === null) {
			this.service.upsertStudent(
				date,
				this.service.selected.student.id,
				!item.arrived,
				item.time_in,
				item.time_out
			)
			this.service.attendanceRecords[i].arrived = !item.arrived
		} else {
			this.selected = date
		}
	}
	timeInEvent(date: string, time_in: string) {
		const i = this.findDate(date)
		const _time_in = this.emptyToNull(i, time_in)
		const item = this.service.attendanceRecords[i]
		this.service.attendanceRecords[i].time_in = _time_in
		clearTimeout(this.timeoutIn)
		this.timeoutIn = setTimeout(() =>
			this.service.upsertStudent(
				date,
				this.service.selected.student.id,
				true,
				_time_in,
				item.time_out
			),
			200
		)
	}
	timeOutEvent(date: string, time_out: string) {
		const i = this.findDate(date)
		const _time_out = this.emptyToNull(i, time_out)
		const item = this.service.attendanceRecords[i]
		clearTimeout(this.timeoutOut)
		this.service.attendanceRecords[i].time_out = _time_out
		this.timeoutOut = setTimeout(() =>
			this.service.upsertStudent(
				date,
				this.service.selected.student.id,
				true,
				item.time_in,
				_time_out
			),
			200
		)
	}
	findDate(date: string): number {
		return this.service.attendanceRecords.findIndex(item => item.date === date)
	}
	emptyToNull(i: number, time: string): string | null {
		if (time.length > 0) {
			this.service.attendanceRecords[i].arrived = true
			return time
		} else return null
	}
}
