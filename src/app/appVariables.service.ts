import {Injectable} from '@angular/core';
import {Hotel} from "./Models";

@Injectable()
export class AppVariablesService {

  constructor() {}

  currentHotel:Hotel;

  LOCALSTORAGE_CURRENTHOTEL_ID:string = "current_hotel_id";
  LOCALSTORAGE_CURRENTHOTEL_NAME:string = "current_hotel_name";
  LOCALSTORAGE_CURRENTHOTEL_PRICE:string = "current_hotel_price";
  public LOCALSTORAGE_user_id  = 'user_id';
  public LOCALSTORAGE_user_fullName  = 'userFullName';

  readonly FRONTEND_LOGIN_PAGE_URL = 'login';
  readonly FRONTEND_SIGNUP_PAGE_URL = 'signup';
  readonly FRONTEND_ALL_HOTELS = 'hotellist';
  readonly FRONTEND_HOTEL = 'hotel';
  readonly FRONTEND_BOOKING_DISPLAY = 'booking';
  readonly FRONTEND_ALL_BOOKINGS_GRID = 'allbookings';
  public previousSRPURL  = "/";



  /*BACKEND URLS*/
  readonly BACKEND_SERVER_URL = 'http://localhost:3000';
  public BACKEND_HOTEL_LIST =  this.BACKEND_SERVER_URL+ '/hotellist';

  //bookings
  readonly BACKEND_ALL_BOOKINGS_GRID =  this.BACKEND_SERVER_URL + '/bookings/allbookings';
  public BACKEND_SUBMIT_BOOKING_URL =  this.BACKEND_SERVER_URL+ '/bookings/submitbooking';
  public BACKEND_RECOMMENDATIONS =  this.BACKEND_SERVER_URL+ '/bookings/recommendations';
  public BACKEND_GET_BOOKING_URL =  this.BACKEND_SERVER_URL+ '/bookings/getbooking';

  //users
  public BACKEND_SIGNUP_URL = this.BACKEND_SERVER_URL + '/users/signup';
  public BACKEND_LOGIN_URL =  this.BACKEND_SERVER_URL+ '/users/login';


}
