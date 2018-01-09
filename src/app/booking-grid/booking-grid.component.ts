import { Component, OnInit } from '@angular/core';
import {AppVariablesService} from "../appVariables.service";
import {Router} from "@angular/router";
import {ServerService} from "../server.service";
import {Booking} from "../Models";

@Component({
  selector: 'app-booking-grid',
  templateUrl: './booking-grid.component.html',
  styleUrls: ['./booking-grid.component.css']
})
export class BookingGridComponent implements OnInit {

  bookings:Booking[];
  constructor(
    private appVariablesService:AppVariablesService,
    private serverService:ServerService,
    private router:Router
  ) { }

  ngOnInit() {
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_ALL_BOOKINGS_GRID,{})
      .subscribe((value:any)=>{
        console.log(value);
        this.bookings = value;
      });
  }

  goToBookingDisplay(booking){
    this.router.navigate(["booking", booking._id]);
  }


}
