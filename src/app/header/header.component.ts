import { Component } from '@angular/core'
import { getDate } from '../get-date'
import { AttendService } from '../attend/attend.service'

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	constructor(public service: AttendService) { }
	date: getDate = new getDate()
}
