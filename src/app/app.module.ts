import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import { HotelPageComponent } from './hotel-page/hotel-page.component';
import { HotelGridComponent } from './hotel-grid/hotel-grid.component';
import {Route, RouterModule} from "@angular/router";
import {NotfoundComponent} from "./notfound/notfound.component";
import { HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {ServerService} from "./server.service";
import {HelperService} from "./helper.service";
import {AppVariablesService} from "./appVariables.service";
import {FormsModule} from "@angular/forms";
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { BookHotelComponent } from './book-hotel/book-hotel.component';
import { BookingDisplayComponent } from './booking-display/booking-display.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { BookingGridComponent } from './booking-grid/booking-grid.component';
import { HomeComponent } from './home/home.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

const routes:Route[] = [
  {path:'hotel/:hotel_id/booking/:_booking_id', component: HotelPageComponent},
  {path:'hotel/:hotel_id/booking', component: HotelPageComponent},
  {path:'hotel', component: HotelPageComponent},
  {path:'recommended', component: RecommendationsComponent},
  {path:'hotellist', component: HotelGridComponent},
  {path:'allbookings', component: BookingGridComponent},
  {path:'booking/:_id', component: BookingDisplayComponent,data:{isItBookingDisplayURL:true}},
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent},
  {path:'**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HotelPageComponent,
    HotelGridComponent,
    NotfoundComponent,
    HotelDetailComponent,
    BookHotelComponent,
    BookingDisplayComponent,
    LoginComponent,
    HeaderComponent,
    BookingGridComponent,
    HomeComponent,
    RecommendationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    ServerService,
    HelperService,
    AppVariablesService,

    ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
