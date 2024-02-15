import { Component } from '@angular/core'
import { GlobalService } from '../global.service'
import { fade, toggleHeight } from '../animations'

@Component({
	selector: 'app-students-list',
	templateUrl: './students-list.component.html',
	styleUrls: ['./students-list.component.css'],
	animations: [fade, toggleHeight]
})
export class StudentsListComponent {
	constructor(public service: GlobalService) { }
	selected = -1
	animationState = ''
	timeout: any
	backEvent() {
		this.animationState = 'void'
		this.service.getClasses()
	}
	NameEvent(studentId: number) {
		for (const item of this.service.studentsInfo) {
			if (item.id !== studentId) continue
			this.animationState = 'void'
			this.service.selectedStudent = item
			this.service.getDates()
			break
		}
	}
	clockEvent(id: number) { this.selected = this.selected === id ? -1 : id }
	checkboxEvent(studentId: number) {
		for (const item of this.service.studentsInfo) {
			if (item.id !== studentId) continue
			if (item.timeIn === null && item.timeOut === null) this.service.upsertStudent(
				null, item.id, item.arrived = !item.arrived, item.timeIn, item.timeOut, item.text)
			else this.selected = item.id
			break
		}
	}
	timeEvent(studentId: number, time: string | null, isTimeIn: boolean) {
		for (const item of this.service.studentsInfo) {
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
		for (const item of this.service.studentsInfo) {
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
