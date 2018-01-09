import { Component, OnInit } from '@angular/core';
import {Hotel} from "../Models";
import {AppVariablesService} from "../appVariables.service";
import {ActivatedRoute} from "@angular/router";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit {

  hotel:Hotel = {};
  constructor(private appVariablesService:AppVariablesService,
              private activatedRoute:ActivatedRoute,
              private serverService:ServerService
  ) { }

  ngOnInit() {
    this.hotel=this.appVariablesService.currentHotel;
    if(!this.hotel){
      let hotel_id = this.activatedRoute.snapshot.paramMap.get('hotel_id');
      this.serverService.makePostRequest(this.appVariablesService.BACKEND_HOTEL_LIST,{_id:hotel_id})
        .subscribe(value=>{
          console.log(value[0]);
          this.hotel = value[0];
        })
    }
  }

}
