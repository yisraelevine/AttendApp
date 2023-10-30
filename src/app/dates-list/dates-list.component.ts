import { Component } from '@angular/core';
import { fade, toggleHeight } from '../animations';
import { GlobalService } from '../global.service';
import { toDate } from '../get-date';

@Component({
	selector: 'app-dates-list',
	templateUrl: './dates-list.component.html',
	styleUrls: ['./dates-list.component.css'],
	animations: [fade, toggleHeight]
})
export class DatesListComponent {
	animationState = '';
	selected = '';
	toDate = toDate;
	timeoutIn: any;
	timeoutOut: any;
	constructor(public globalService: GlobalService) { }
	backIconEvent() {
		this.animationState = 'void';
		this.globalService.getStudents(this.globalService.selectedClassId);
	}
	clockIconEvent(date: string) {
		this.selected = this.selected === date ? '' : date;
	}
	isWeekEnd(date: string): boolean {
		return new Date(date).getDay() === 4;
	}
	isHidden(date: string): boolean {
		return this.globalService.sundaysOff() && new Date(date).getDay() === 6
	}
	checkboxEvent(date: string) {
		const i = this.findDate(date);
		const item = this.globalService.datesList[i];
		if (item.time_in === null && item.time_out === null) {
			this.globalService.upsertStudent(
				date,
				this.globalService.selectedStudentId,
				!item.arrived,
				item.time_in,
				item.time_out
			);
			this.globalService.datesList[i].arrived = !item.arrived;
		} else {
			this.selected = date;
		}
	}
	timeInEvent(date: string, time_in: string) {
		const i = this.findDate(date);
		const _time_in = this.emptyToNull(i, time_in);
		const item = this.globalService.datesList[i];
		this.globalService.datesList[i].time_in = _time_in;
		clearTimeout(this.timeoutIn);
		this.timeoutIn = setTimeout(() =>
			this.globalService.upsertStudent(
				date,
				this.globalService.selectedStudentId,
				true,
				_time_in,
				item.time_out
			),
			200
		);
	}
	timeOutEvent(date: string, time_out: string) {
		const i = this.findDate(date);
		const _time_out = this.emptyToNull(i, time_out);
		const item = this.globalService.datesList[i];
		clearTimeout(this.timeoutOut);
		this.globalService.datesList[i].time_out = _time_out;
		this.timeoutOut = setTimeout(() =>
			this.globalService.upsertStudent(
				date,
				this.globalService.selectedStudentId,
				true,
				item.time_in,
				_time_out
			),
			200
		);
	}
	findDate(date: string): number {
		return this.globalService.datesList.findIndex(item => item.date === date);
	}
	emptyToNull(i: number, time: string): string | null {
		if (time.length > 0) {
			this.globalService.datesList[i].arrived = true;
			return time;
		} else return null;
	}
}
