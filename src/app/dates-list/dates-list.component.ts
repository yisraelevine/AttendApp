import { Component } from '@angular/core'
import { fade, toggleHeight } from '../animations'
import { GlobalService } from '../global.service'
import { getDate } from '../get-date'
import { HDate } from '@hebcal/core'

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
	getWeekDay = getDate.getWeekDay
	timeout: any
	isHiddenVar = false
	constructor(public service: GlobalService) { }
	backEvent() {
		this.animationState = 'void'
		this.service.getStudents()
	}
	clockEvent(date: string) { this.selected = this.selected === date ? '' : date }
	checkboxEvent(date: string) {
		for (const item of this.service.attendanceRecords) {
			if (item.date !== date) continue
			if (item.time_in === null && item.time_out === null) this.service.upsertStudent(
				date, this.service.selectedStudent.id, item.arrived = !item.arrived, item.time_in, item.time_out, item.text)
			else this.selected = date
			break
		}
	}
	timeEvent(date: string, time: string | null, isTimeIn: boolean) {
		for (const item of this.service.attendanceRecords) {
			if (item.date !== date) continue
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
		for (const item of this.service.attendanceRecords) {
			if (item.date !== date) continue
			text = text?.length === 0 ? null : text
			item.text = text
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => this.service.upsertStudent(
				date, this.service.selectedStudent.id, item.arrived, item.time_in, item.time_out, item.text), 200)
			break
		}
	}
	isWeekEnd = (date: string) => new Date(date).getDay() === 5
	isHidden = (date: string) => (new Date(date).getDay() === 0 && this.service.selectedClass.sundays_off)
		|| this.service.offDates.includes(date)
	getByWeek(week: number) {
		return this.service.attendanceRecords.filter(e => e.week === week)
	}
	getNameOfWeek(week: number) {
		const array = this.service.attendanceRecords.filter(e => e.week === week)
		return `${array.at(-1)!.date.slice(4, 10)} - ${array.at(0)!.date.slice(4, 10)}`
	}
	getNameOfHebrewWeek(week: number) {
		const array = this.service.attendanceRecords.filter(e => e.week === week)
		return `${new HDate(new Date(array.at(-1)!.date)).renderGematriya(true).slice(0, -6)} - ${new HDate(new Date(array.at(0)!.date)).renderGematriya(true).slice(0, -6)}`
	}
	getWeeksCount() {
		return Array.from({ length: (this.service.attendanceRecords.at(-1)?.week || 0) + 1 }, (_, i) => i)
	}
	getDay(date: string) {
		return new Date(date).getDay() + 1
	}
	getHebrewDate(date: string) {
		return new HDate(new Date(date)).renderGematriya().split(' ')[0].replace(/[^א-ת]/g, '')
	}
}
