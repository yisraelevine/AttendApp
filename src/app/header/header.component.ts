import { Component } from '@angular/core';
import { HDate } from '@hebcal/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	hdate: string;
	tdate: string;
	constructor() {
		let hd = new HDate();
		const td = new Date();
		if (new Date().getHours() < 4) {
			hd = hd.subtract(1);
			td.setDate(td.getDate() - 1);
		}
		this.hdate = hd.renderGematriya(true);
		this.tdate = td.toLocaleDateString('en-US');
	}
}
