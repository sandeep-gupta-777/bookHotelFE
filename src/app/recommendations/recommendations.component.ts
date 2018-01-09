import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {Hotel} from "../Models";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  hotels:Hotel;
  constructor(
    private serverService:ServerService,
    private appVariablesService:AppVariablesService,

  ) { }

  ngOnInit() {

    let user_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id);
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_RECOMMENDATIONS,{bookingCustomer_id:user_id})
      .subscribe((value)=>{
        console.log(value);
        this.hotels = value;
      })
  }

}
