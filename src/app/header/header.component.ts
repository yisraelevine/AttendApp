import { Component } from '@angular/core';
import { HDate } from '@hebcal/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  hdate: string = new HDate().renderGematriya(true);

  tdate: string = new Date().toLocaleDateString('en-US');

}
