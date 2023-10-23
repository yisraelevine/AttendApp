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
		if (item.time_in === null && item.time_out === null) {
			this.globalService.upsertStudent(
				item.id,
				!item.arrived,
				item.time_in,
				item.time_out
			);
			this.globalService.studentsList[i].arrived = !item.arrived;
		} else {
			this.globalService.selectedStudent = item.id;
		}
	}
	timeInEvent(student_id: number, time_in: string) {
		const i = this.findStudent(student_id);
		const _time_in = this.emptyToNull(i, time_in);
		const item = this.globalService.studentsList[i];
		this.globalService.studentsList[i].time_in = _time_in;
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
	}
	timeOutEvent(student_id: number, time_out: string) {
		const i = this.findStudent(student_id);
		const _time_out = this.emptyToNull(i, time_out);
		const item = this.globalService.studentsList[i];
		clearTimeout(this.timeoutOut);
		this.globalService.studentsList[i].time_out = _time_out;
		this.timeoutOut = setTimeout(() =>				
			this.globalService.upsertStudent(
				item.id,
				true,
				item.time_in,
				_time_out
			),
			200
		);
	}
	findStudent(student_id: number): number {
		return this.globalService.studentsList.findIndex(item => item.id === student_id);
	}
	emptyToNull(i: number, time: string): string | null {
		if (time.length > 0) {
			this.globalService.studentsList[i].arrived = true;
			return time;
		} else return null;
	}
}
