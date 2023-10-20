import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { fade } from '../animations';

@Component({
	selector: 'app-students-list',
	templateUrl: './students-list.component.html',
	styleUrls: ['./students-list.component.css'],
	animations: [fade]
})
export class StudentsListComponent {
	constructor(public globalService: GlobalService) { }
	boxEvent(student_id: number, arrived: boolean) {
		this.globalService.upsertStudent(student_id, arrived, null, null);
	}
}
