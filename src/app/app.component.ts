import { Component, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { fade } from './animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [fade]
})
export class AppComponent implements OnInit {
	constructor(public service: GlobalService) { }
	ngOnInit() {
		this.service.getClasses();
	}

}
