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
	animationState = ''
	constructor(public service: GlobalService) { }
	finalize(item: ClassInfo){
		this.animationState = 'void'
		this.service.selectedClass = item
	}
	nameEvent(item: ClassInfo) {
		this.finalize(item)
		this.service.getStudents()
	}
	settingsEvent(item: ClassInfo) {
		this.finalize(item)
		this.service.getEmployees()
	}
}
