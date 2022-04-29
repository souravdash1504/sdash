import { Component, OnInit } from '@angular/core';
import { SouravService } from '../sourav.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private SouravService : SouravService , private router :Router) { 
    
   }
   responseError:any

  userdetails:any = {
    
  }

  login(){
    var url="https://apifromashu.herokuapp.com/api/login"
    this.SouravService.login(url,this.userdetails).subscribe({
      next:(response:any)=>{
        console.log("Response from login api" , response)
        if(response.token){
          localStorage["token"] = response.token
          localStorage["loggedinUser"] =  response.email
          var url = "https://apifromashu.herokuapp.com/api/cakecart"
          var headers = new HttpHeaders()
          headers = headers.append("authtoken",localStorage["token"])
          var body = {}
          var options = {
             headers:headers
          }
          this.SouravService.getCartItems(url,body,options).subscribe({
             next:(response:any)=>{
                console.log("response from cart items api in navbar", response)
                this.SouravService.cartitems = response.data
             }
          })
          this.router.navigate(["/"])
        }
        else{
          this.responseError = "Invalid Login"
        }
      },
      error:(error)=>{
        console.log("Error from login api" , error)
      }
    })
  }

  ngOnInit(): void {
  }

}
