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
		this.animationState = 'void';
		this.service.getClasses();
	}
	NameEvent(student_id: number) {
		for (const item of this.service.studentsInfo) {
			if (item.id === student_id) {
				this.animationState = 'void';
				this.service.selected.student.name = item.last_name + ", " + item.first_name;
				this.service.getDates(student_id);
				break;
			}
		}
	}
	clockEvent(id: number) { this.selected = this.selected === id ? -1 : id }
	checkboxEvent(student_id: number) {
		for (const item of this.service.studentsInfo) {
			if (item.id === student_id) {
				if (item.time_in === null && item.time_out === null) {
					item.arrived = !item.arrived
					this.service.upsertStudent(
						null,
						item.id,
						item.arrived,
						item.time_in,
						item.time_out
					)
				} else this.selected = item.id
				break
			}
		}
	}
	timeEvent(student_id: number, time: string, isTimeIn: boolean) {
		for (const item of this.service.studentsInfo) {
			if (item.id === student_id) {
				if (time.length > 0) {
					item.arrived = true
					isTimeIn ? item.time_in = time : item.time_out = time
				} else isTimeIn ? item.time_in = null : item.time_out = null
				clearTimeout(this.timeout)
				this.timeout = setTimeout(() => this.service.upsertStudent(
					null,
					item.id,
					item.arrived,
					item.time_in,
					item.time_out
				), 200)
				break
			}
		}
	}
}
