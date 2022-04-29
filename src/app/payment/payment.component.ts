import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SouravService } from '../sourav.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartitems:any
  totalPrice:any = 0
  constructor(private sourav:SouravService,private toastr:ToastrService,private route:Router) { 
    var url = "https://apifromashu.herokuapp.com/api/cakecart"
    let myheader = new HttpHeaders()
    myheader = myheader.append("authtoken",localStorage["token"])
    var options = {
      headers: myheader
    }
    var body = {}
    this.sourav.getCartItems(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("response form cart items is ", response)
        this.cartitems = response.data
        if(this.cartitems){
          for(let x of this.cartitems){
            this.totalPrice += x.price * x.quantity
            console.log(`price ${x.price} and quantity ${x.quantity}`)
          }
        }
        this.sourav.cartitems = this.cartitems
        this.sourav.totalprice = this.totalPrice
      },
      error:(error)=>{
        console.log("error from cart items is  ", error)
      }
    })
    
  }
  paynow(){

    if(this.cartitems.length>0){
    var url = "https://apifromashu.herokuapp.com/api/addcakeorder"
    let myheader = new HttpHeaders()
    myheader = myheader.append("authtoken",localStorage["token"])
    var options = {
      headers: myheader
    }
    var body = {
      cakes: this.cartitems,
      price:this.totalPrice,
      name:localStorage["name"],
      address:localStorage["address"],
      city: localStorage["city"],
      pincode: localStorage["pincode"],
      phone: localStorage["phone"]

    }
    console.log("body is ",body)
    this.sourav.postForPayment(url,body,options).subscribe({
      next:(response)=>{
        console.log("response from payment is", response)
      },
      error:(error)=>{
        console.log("error from payment is", error)
      }
    })
    this.toastr.success('succesfully Placed')
    console.log(this.sourav.cakes,this.cartitems)
  }
  else{
    alert("Your cart is empty please add items")
    this.route.navigate([""])
  }
}
  ngOnInit(): void {
  }

}
