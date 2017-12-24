import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CartisanOrder, OrderImageContainer} from "../Models";
import {ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit,OnChanges {

  orderPriceEstimationMode: number = 0;//0==all at once, 1=individual images
  tempPrice: number;
  @Input() currentOrderObservable: Observable<CartisanOrder>;
  @Input() currentImageContainerIndexBeingEdited: number;
  cartisanOrder: CartisanOrder = null;
  isItOrderDetailComponent: boolean;//http://localhost:4200/orderdetail/5a3a4d8bf97ea95b1cc41e8c requires mode=0
  isItImageEditComponent: boolean;//root/neworder/5a3a4d8bf97ea95b1cc41e8c/imageEdit requires mode=1
  role:string;
  constructor(private activatedRoute: ActivatedRoute,
              private serverService: ServerService,
              private appVariablesService: AppVariablesService,) {
  }


  print() {
    alert(this.currentImageContainerIndexBeingEdited);
  }
  ngOnChanges(changes: SimpleChanges) {

    if(this.cartisanOrder && changes.currentImageContainerIndexBeingEdited.currentValue!== changes.currentImageContainerIndexBeingEdited.previousValue){
      this.tempPrice = this.cartisanOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImagePrice||0;
    }
  }
  isItWorkshopRole(){
    return localStorage.getItem('userRole')==="workshop_owner";
  }

  ngOnInit() {
    this.currentOrderObservable
      .subscribe((value: CartisanOrder) => {//TODO: use async pipe instead
        console.log(value);
        this.cartisanOrder = value;
        if (this.cartisanOrder.orderPriceEstimationMode)
          this.orderPriceEstimationMode = this.cartisanOrder.orderPriceEstimationMode;
        if(this.cartisanOrder.orderImageContainersArray && this.cartisanOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImagePrice){
          this.tempPrice = this.cartisanOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImagePrice;
        }
      });

    this.activatedRoute.data.subscribe((value: any) => {
      if (value.isItOrderDetailComponent) {
        this.isItOrderDetailComponent = true;
      }
      if (value.isItImageEditComponent) {
        this.isItImageEditComponent = true;
      }
    })
  }

  shouldShowPricePanel(): boolean {
    //TODO: following wont work with ===
    return this.orderPriceEstimationMode == 1 && this.isItImageEditComponent || this.orderPriceEstimationMode == 0 && this.isItOrderDetailComponent;
  }

  onChange(value: any) {
    console.log(value);
    this.orderPriceEstimationMode = value;
  }

  priceChanged(value: any) {
    if (isUndefined(value) && value === "") {
      return;
    }
    if (this.orderPriceEstimationMode == 0) {
      return this.cartisanOrder.orderTotalPrice = isUndefined(this.tempPrice) ? this.cartisanOrder.orderTotalPrice : this.tempPrice;
    }
    else {
      this.cartisanOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImagePrice = value;
    }
  }

  // modeChanged(value:any){
  //   if(isUndefined(value) && value===""){
  //     return;
  //   }
  //   this.orderPriceEstimationMode =value;
  // }

  calculateTotalPrice() {
    let tempPrice = 0;
    if (this.orderPriceEstimationMode == 0) {
      return this.cartisanOrder.orderTotalPrice = isUndefined(this.tempPrice) ? this.cartisanOrder.orderTotalPrice : this.tempPrice;
    }
    else {
      this.cartisanOrder.orderImageContainersArray.forEach((orderImageContainer: OrderImageContainer, index, array) => {
        if (orderImageContainer.orderImagePrice) {
          tempPrice += orderImageContainer.orderImagePrice;
        }
      });
      return this.cartisanOrder.orderTotalPrice = tempPrice;
    }

  }

  saveOrderInServer() {
    if (this.orderPriceEstimationMode)
      this.cartisanOrder.orderPriceEstimationMode = this.orderPriceEstimationMode;

    this.serverService.makePostRequest(this.appVariablesService.BACKEND_ORDER_SAVE_URL, this.cartisanOrder).subscribe((value) => {
      console.log(value);
    });
  }

}
