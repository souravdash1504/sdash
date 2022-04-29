import { Component, OnInit } from '@angular/core';
import { SouravService } from '../sourav.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userdetails:any = {}
  constructor(private sourav : SouravService) {
   }

  addAddress(){
    this.sourav.userdetails = this.userdetails
  }

  ngOnInit(): void {
  }

}
