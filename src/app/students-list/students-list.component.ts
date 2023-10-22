import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { fade, toggleHeight } from '../animations';

@Component({
	selector: 'app-students-list',
	templateUrl: './students-list.component.html',
	styleUrls: ['./students-list.component.css'],
	animations: [fade, toggleHeight]
})
export class StudentsListComponent {
	constructor(public globalService: GlobalService) { }
	animationState = '';
	timeoutIn: any;
	timeoutOut: any;
	backIconEvent() {
		this.globalService.selectedStudent = -1;
		this.animationState = 'void';
		this.globalService.getClasses();
	}
	clockIconEvent(id: number) {
		this.globalService.selectedStudent = this.globalService.selectedStudent === id ? -1 : id;
	}
	checkboxEvent(student_id: number) {
		const i = this.findStudent(student_id);
		const item = this.globalService.studentsList[i];
		this.globalService.upsertStudent(
			item.id,
			!item.arrived,
			item.time_in,
			item.time_out
		);
		this.globalService.studentsList[i].arrived = !item.arrived;
	}
	timeInEvent(student_id: number, time_in: string) {
		const _time_in = time_in.length > 0 ? time_in : null;
		const i = this.findStudent(student_id);
		const item = this.globalService.studentsList[i];
		clearTimeout(this.timeoutIn);
		this.timeoutIn = setTimeout(() =>				
			this.globalService.upsertStudent(
				item.id,
				true,
				_time_in,
				item.time_out
			),
			200
		);
		this.globalService.studentsList[i].time_in = _time_in;
		if (_time_in !== null) this.globalService.studentsList[i].arrived = true;
	}
	timeOutEvent(student_id: number, time_out: string) {
		const _time_out = time_out.length > 0 ? time_out : null;
		const i = this.findStudent(student_id);
		const item = this.globalService.studentsList[i];
		clearTimeout(this.timeoutOut);
		this.timeoutOut = setTimeout(() =>				
			this.globalService.upsertStudent(
				item.id,
				true,
				item.time_in,
				_time_out
			),
			200
		);
		this.globalService.studentsList[i].time_out = _time_out;
		if (_time_out !== null) this.globalService.studentsList[i].arrived = true;
	}
	findStudent(student_id: number): number {
		return this.globalService.studentsList.findIndex(item => item.id === student_id);
	}
}
