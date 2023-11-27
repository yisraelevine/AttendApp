import { Component } from '@angular/core'
import { GlobalService } from '../global.service'
import { fade } from '../animations'
import { ClassInfo } from '../interfaces'

@Component({
	selector: 'app-classes-list',
	templateUrl: './classes-list.component.html',
	styleUrls: ['./classes-list.component.css'],
	animations: [fade]
})
export class ClassesListComponent {
	constructor(public service: GlobalService) { }
	animationState = ''
	nameEvent(item: ClassInfo) {
		this.animationState = 'void'
		this.service.getStudents(item.id)
		this.service.selected.class.name = item.name
		this.service.sundaysOff = item.sundays_off
	}
	settingsEvent(item: ClassInfo) {
		this.animationState = 'void'
		this.service.getPermissions(item.id)
		this.service.selected.class.name = item.name
	}
}
