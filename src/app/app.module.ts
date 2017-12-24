import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {Route, Router, RouterModule} from "@angular/router";
import {NotfoundComponent} from "./notfound/notfound.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {AuthService} from "./auth.service";
import {ServerService} from "./server.service";
import {HelperService} from "./helper.service";
import {AppVariablesService} from "./appVariables.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import { GridComponent } from './grid/grid.component';
import { OrderDisplayComponent } from './order-display/order-display.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterGaurdServiceService} from "./router-gaurd-service.service";
import { ImageEditComponent } from './image-edit/image-edit.component';
import { TimelineComponent } from './timeline/timeline.component';
import { EditorComponent } from './editor/editor.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { PriceComponent } from './price/price.component';

const routes:Route[] = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'neworder', component: NewOrderComponent, canActivate:[RouterGaurdServiceService]},
  {path:'neworder/:_id/imageEdit', component: ImageEditComponent,canActivate:[RouterGaurdServiceService], data:{isItImageEditComponent:true}},
  {path:'allorders', component: OrderDisplayComponent,canActivate:[RouterGaurdServiceService]},//TODO
  {path:'orderdetail/:_id', component: OrderDetailsComponent,canActivate:[RouterGaurdServiceService], data:{isItOrderDetailComponent:true}},

  {path:'Dashboard', component: DashboardComponent,canActivate:[RouterGaurdServiceService]},
  {path:'', component: HomepageComponent},
  {path:'**', component: NotfoundComponent},

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    GridComponent,
    OrderDisplayComponent,
    OrderDetailsComponent,
    HomepageComponent,
    ImageEditComponent,
    TimelineComponent,
    EditorComponent,
    NewOrderComponent,
    PriceComponent,
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
    RouterGaurdServiceService
  ],
  bootstrap: [
    AppComponent

  ]
})
export class AppModule { }
