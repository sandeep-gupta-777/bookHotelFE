
export interface Hotel{
  _id?:string
  hotelName?:string,
  hotelAddress?:string,
  hotelCity?: string,
  hotelState?:string,
  hotelImageUrl?:string,
  hotelCustomerId?:string[],
  hotelPrice?:number;
}

export interface Booking{

    _id?:string
    bookingCustomerFullName?: string,
    bookingCustomer_id?: string,
    bookingCheckInDate?: string,
    bookingCheckOutdate?: string,
    bookingAdultsCount?: number,
    bookingChildrenCount?: number,
    bookingOtherDetails?: string,//TODO: make it embedded
    bookingTotalPrice?: number,
    bookingIsSubmitted?:boolean,
    bookingHotel_id?:string,
  bookingHotel_Name?:string
  }

export interface Customer {

  _id?:string,
  customerPassword?: string,
  customerFullName?: string,
  customerEmail?: string,

}

