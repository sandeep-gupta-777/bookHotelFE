import {Component, OnInit} from '@angular/core';
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {CartisanOrder} from "../Models";
import {promise} from "selenium-webdriver";
import CancellationError = promise.CancellationError;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  currentOrder: CartisanOrder;
  currentOrderObservable: Observable<CartisanOrder>;

  constructor(private serverService: ServerService,
              private appVariablesService: AppVariablesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  goToImageEditPage() {
    this.router.navigate([this.appVariablesService.FRONTEND_ORDER_IMAGE_EDIT_PAGE_URL(this.currentOrder._id)]);
  }

  ngOnInit() {
    let user_id = localStorage.getItem('userID');
    let tempCurrentOrder_id = this.activatedRoute.snapshot.paramMap.get('_id');
    console.log(tempCurrentOrder_id);
    this.currentOrderObservable = this.serverService.makeGetRequest(this.appVariablesService.BACKEND_GETORDER_URL + `?order_id=${tempCurrentOrder_id}`);
    this.currentOrderObservable
      .subscribe((value: CartisanOrder) => {//TODO: use async pipe instead
        console.log(value);
        this.currentOrder = value;
      })
  }

}
