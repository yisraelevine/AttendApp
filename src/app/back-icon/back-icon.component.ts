import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-back-icon',
  templateUrl: './back-icon.component.html',
  styleUrls: ['./back-icon.component.css']
})
export class BackIconComponent {
  constructor(public globalService: GlobalService) { }

  iconEvent() {
    this.globalService.getClasses();
  }
}
