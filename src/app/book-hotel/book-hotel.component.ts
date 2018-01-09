import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Booking, Hotel} from "../Models";
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-book-hotel',
  templateUrl: './book-hotel.component.html',
  styleUrls: ['./book-hotel.component.css']
})
export class BookHotelComponent implements OnInit {

  @Input() hotel:Hotel;
  currentHotel_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_CURRENTHOTEL_ID);
  currentHotel_Name = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_CURRENTHOTEL_NAME);
  currentHotel_Price = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_CURRENTHOTEL_PRICE);
  currentBooking_id :string;
  @ViewChild('f') form;
  booking:Booking = {bookingCustomer_id:"",bookingIsSubmitted:false};
  constructor(
    private serverService:ServerService,
    private appVariablesService:AppVariablesService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentBooking_id = this.activatedRoute.snapshot.paramMap.get('_booking_id');

    let criteriaObj:any = {};
    if(this.currentBooking_id){
      criteriaObj._id = this.currentBooking_id;
    }
    else {
      let currentHotel_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_CURRENTHOTEL_ID);
      let user_id  = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id)
      criteriaObj = {
        bookingHotel_id: currentHotel_id,
        bookingCustomer_id: user_id,
        bookingIsSubmitted:false
      }
    }
    console.log('on init');
    let temp_id = this.activatedRoute.snapshot.paramMap.get('_booking_id');
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_GET_BOOKING_URL,criteriaObj)
      .subscribe((value:Booking)=>{
        console.log("booking from server",value);
        this.router.navigate([this.appVariablesService.FRONTEND_HOTEL,this.currentHotel_id,'booking',value._id]);
        this.booking = value;
      })
  }
  onSubmit(f:HTMLFormElement){
    this.saveBooking(true);
    console.log(this.form);
  }
  saveBooking(bookingIsSubmitted:boolean=false){
    console.log(this.form.value);
    this.booking = this.form.value;
    this.booking.bookingCustomer_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id);
    this.booking.bookingIsSubmitted = bookingIsSubmitted;

    this.booking.bookingHotel_id = this.currentHotel_id;
    this.booking.bookingHotel_Name = this.currentHotel_Name;
    this.booking.bookingTotalPrice = parseInt(this.currentHotel_Price);


    if(this.activatedRoute.snapshot.paramMap.get('_booking_id'))
    this.booking._id = this.activatedRoute.snapshot.paramMap.get('_booking_id');
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_SUBMIT_BOOKING_URL,this.booking)
      .subscribe((value:{message:String,savedBooking:Booking})=>{
        console.log(value);
        this.booking = value.savedBooking;
        if(value.savedBooking.bookingIsSubmitted===true)
        this.router.navigate([this.appVariablesService.FRONTEND_BOOKING_DISPLAY,value.savedBooking._id]);
        else {
          this.router.navigate([this.appVariablesService.FRONTEND_HOTEL,this.currentHotel_id,'booking',value.savedBooking._id]);
        }
      })
    ;
  }

}
