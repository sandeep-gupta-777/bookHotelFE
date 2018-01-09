import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from "../Models";
import {AppVariablesService} from "../appVariables.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  @Input() hotel:Hotel = {};
  constructor(
    private appVariablesService: AppVariablesService,
    private router:Router

  ) { }

  ngOnInit() {
  }

  hotelClicked(hotel:Hotel){
    localStorage.setItem(this.appVariablesService.LOCALSTORAGE_CURRENTHOTEL_ID,this.hotel._id);
    localStorage.setItem(this.appVariablesService.LOCALSTORAGE_CURRENTHOTEL_NAME,this.hotel.hotelName);
    localStorage.setItem(this.appVariablesService.LOCALSTORAGE_CURRENTHOTEL_PRICE,this.hotel.hotelPrice.toString());
    this.appVariablesService.currentHotel = hotel;
    this.router.navigate([this.appVariablesService.FRONTEND_HOTEL,this.hotel._id,'booking'])
  }

}
