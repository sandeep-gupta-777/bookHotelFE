import { Component, OnInit } from '@angular/core';
import {Hotel} from "../Models";
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotel-grid',
  templateUrl: './hotel-grid.component.html',
  styleUrls: ['./hotel-grid.component.css']
})
export class HotelGridComponent implements OnInit {


  hotels:Hotel[] = [];
  constructor(private serverService:ServerService,
              private appVariablesService:AppVariablesService,
              private router:Router
  ) {}

  ngOnInit() {

    console.log(444444444444)
    let tempHotel:Hotel = {};
    tempHotel.hotelName = "Hotal Taj";
    tempHotel.hotelImageUrl = "https://upload.wikimedia.org/wikipedia/commons/7/72/The_TajMahal_Palace_Hotel.jpg";
    tempHotel.hotelCity = "Mumbai";
    tempHotel.hotelAddress = "Marine drive, Mumbai";
    tempHotel.hotelState = "Maharashtra";
    tempHotel.hotelPrice= 0;
    tempHotel._id = "1";

    this.hotels.push(tempHotel);

  //  make get request to retrive 10 hotels
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_HOTEL_LIST,{})
      .subscribe((hotels:Hotel[])=>{
        this.hotels = hotels;
      })
  }

  // hotelClicked(hotel:Hotel){
  //   this.appVariablesService.currentHotel = hotel;
  //   this.router.navigate([this.appVariablesService.FRONTEND_HOTEL]);
  // }



}
