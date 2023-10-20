import { Component, Input } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent {

	constructor(public globalService: GlobalService) { }

	@Input() arrived = false;

}
