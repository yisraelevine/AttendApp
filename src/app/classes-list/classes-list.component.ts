import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { fade } from '../animations';

@Component({
	selector: 'app-classes-list',
	templateUrl: './classes-list.component.html',
	styleUrls: ['./classes-list.component.css', '../items-container.css'],
	animations: [fade]
})
export class ClassesListComponent {
	constructor(public globalService: GlobalService) { }
	animationState = '';
	nameEvent(class_id: number, name: string) {
		this.animationState = 'void';
		this.globalService.getStudents(class_id);
		this.globalService.selectedClassName = name;
	}
	settingsEvent(class_id: number, name: string) {
		this.animationState = 'void';
		this.globalService.getPermissions(class_id);
		this.globalService.selectedClassName = name;
	}
}
