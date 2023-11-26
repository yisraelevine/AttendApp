import { Component } from '@angular/core'
import { getDate } from '../get-date'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	date: getDate = new getDate()
}
