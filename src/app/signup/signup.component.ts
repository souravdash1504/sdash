import { Component, OnInit } from '@angular/core';
import { SouravService } from '../sourav.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userdetails: any = {
    email:"",
    name:"",
    password:""
  }
  users:any = []
  responseError:any
  signupForm:any
  flag = false
  display(){
  


    this.toastr.success('succesfully added')
    // this.toastr.show(this.service.port)
    this.users.push([this.userdetails.name,this.userdetails.email])
    this.flag = true 
      var url="https://apifromashu.herokuapp.com/api/register"
      this.http.post(url,this.userdetails).subscribe({
        next:(response:any)=>{
          console.log("the response of sign up is", response)
          if(response["message"] == "User Already Exists"){
            this.responseError = "inavali user or user already exist";
          }
        },
        error:(error:any)=>{
          console.log("sign up error is",error)
        }
      })
  }
  pop(){
    this.users.pop()
  }
  
  constructor(private toastr: ToastrService, private http:HttpClient, private sourav:SouravService, private formbuilder:FormBuilder) {
   }
  ngOnInit(): void {
  }

}
