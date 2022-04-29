import { Component } from '@angular/core';
import { SouravService } from './sourav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sourav:SouravService){

  }
}
