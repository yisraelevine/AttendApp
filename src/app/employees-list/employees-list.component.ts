import { Component } from '@angular/core'
import { GlobalService } from '../global.service'
import { fade, toggleHeight } from '../animations'

@Component({
	selector: 'app-employees-list',
	templateUrl: './employees-list.component.html',
	styleUrls: ['./employees-list.component.css'],
	animations: [fade, toggleHeight]
})
export class EmployeesListComponent {
	animationState = ''
	constructor(public service: GlobalService) { }
	backEvent() {
		this.animationState = 'void'
		this.service.getClasses()
	}
}
