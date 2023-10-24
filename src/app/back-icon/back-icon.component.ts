import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
	selector: 'app-back-icon',
	template: '<i></i>',
	styleUrls: ['./back-icon.component.css']
})
export class BackIconComponent {
	constructor(public globalService: GlobalService) { }
}
