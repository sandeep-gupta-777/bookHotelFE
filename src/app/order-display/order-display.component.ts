import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartisanOrder} from "../Models";
import {ServerService} from "../server.service";
import {Router} from "@angular/router";
import {AppVariablesService} from "../appVariables.service";
import {HelperService} from "../helper.service";

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit, OnDestroy{

  defaultImageURL = "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb";
  resultsArrivedEventEmitterSubscription;
  awsBucketURL = "https://s3-us-west-2.amazonaws.com/photogridsandeep/";
  cartisanOrderArray:CartisanOrder[];
  constructor(
    private serverService:ServerService,
    private router:Router,
    private appVariablesService:AppVariablesService,
    private helperService:HelperService,

  ) { }

  ngOnInit() {
    this.serverService.performSearch(this.helperService.getQueryParam('keyword'));;
    this.resultsArrivedEventEmitterSubscription = this.serverService.resultsArrivedEventEmitter
      .subscribe(value=>{
        console.log('inside display', value);;
        this.cartisanOrderArray = value;
      });
  }
  orderClicked(cartisanOrder:CartisanOrder){
    this.router.navigate([this.appVariablesService.FRONTEND_ORDER_DETAIL_URL, cartisanOrder._id])
  }
  ngOnDestroy(): void {
    this.resultsArrivedEventEmitterSubscription.unsubscribe();
  }

}
