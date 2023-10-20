import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
	selector: 'app-students-list',
	templateUrl: './students-list.component.html',
	styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent {
	constructor(public globalService: GlobalService) { }
	boxEvent(student_id: number, arrived: boolean) {
		this.globalService.upsertStudent(student_id, arrived, null, null);
	}
}
