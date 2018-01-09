import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../Models";
import {ActivatedRoute, Router} from "@angular/router";
import {AppVariablesService} from "../appVariables.service";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-booking-display',
  templateUrl: './booking-display.component.html',
  styleUrls: ['./booking-display.component.css']
})
export class BookingDisplayComponent implements OnInit {

  @Input() booking:Booking;
  booking_id = this.activatedRoute.snapshot.paramMap.get('_id');
  // booking:Booking = {bookingCustomer_id:"",bookingIsSubmitted:false};
  constructor(
    private serverService:ServerService,
    private appVariablesService:AppVariablesService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    let criteriaObj:any = {};
    if(this.booking_id){
      criteriaObj._id = this.booking_id;
    }

    let flagData:any = this.activatedRoute.snapshot.data;;
    let flag:any = flagData.isItBookingDisplayURL;
    if(flag)
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_GET_BOOKING_URL,{_id:this.booking_id})
      .subscribe((value)=>{
        console.log("booking from server",value);
        this.booking = value;
      })
  }

}
