import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent {
  constructor(public globalService: GlobalService) { }

}
