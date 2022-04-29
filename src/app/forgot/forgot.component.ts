import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SouravService } from '../sourav.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  emailid:any
  message:any
  constructor(private sourav:SouravService, private aroute:ActivatedRoute) { 

    this.emailid = this.sourav.email.toString()
    console.log("the email is",this.sourav.email)
    var url="https://apifromashu.herokuapp.com/api/recoverpassword"
    var body = {
      email:this.emailid
    }
    this.sourav.getpassword(url,body).subscribe({
      next:(response:any)=>{
        console.log("response from forgetpassword ",response)
        this.message = response.message
      },
      error:(error)=>{
        console.log("error from forget is",error)
      }
    })
  }

  ngOnInit(): void {
  }

}
