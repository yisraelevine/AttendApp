import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { fade, toggleHeight } from '../animations';

@Component({
	selector: 'app-permissions-list',
	templateUrl: './permissions-list.component.html',
	styleUrls: ['./permissions-list.component.css'],
	animations: [fade, toggleHeight]
})
export class PermissionsListComponent {
	constructor(public globalService: GlobalService) { }
	animationState = '';
	backIconEvent() {
		this.animationState = 'void';
		this.globalService.getClasses();
	}
}
