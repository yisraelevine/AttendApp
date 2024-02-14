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
	hebrew: boolean = false
	constructor(public service: GlobalService) { }
	backEvent() {
		this.animationState = 'void'
		this.service.getStudents()
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
