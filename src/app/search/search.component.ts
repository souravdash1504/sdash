import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SouravService } from '../sourav.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchitems:any = []
  constructor(private route : ActivatedRoute , private sourav : SouravService) { 
    this.route.queryParams.subscribe((query:any)=>{
      var searchtext = query["q"]
      var url = "https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
      this.sourav.searchCakes(url).subscribe({
        next:(response:any)=>{
            console.log("Response from search cakes api" , response)
            this.searchitems = response.data
        },
        error:(error)=>{
            console.log("error from search ckesa api" , error)
        }
      })
    })
    
  }

  ngOnInit(): void {
  }

}
