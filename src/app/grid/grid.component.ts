import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartisanOrder} from "../Models";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {AppVariablesService} from "../appVariables.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() cartisanOrder:CartisanOrder  = {orderImageContainersArray:[]};
  @Output() imageDetailEvent:EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private appVariablesService:AppVariablesService
  ) {}

  isItImageEditComponent:false;
  ngOnInit() {
    console.log('grid service init');
    console.log(this.cartisanOrder);
    this.activatedRoute.data.subscribe((data:any)=>{this.isItImageEditComponent=data.isItImageEditComponent});//TODO:data:Data will give type error. Find out why?
  }
  goToImageEditPage(){
    this.router.navigate([this.appVariablesService.FRONTEND_ORDER_IMAGE_EDIT_PAGE_URL(this.cartisanOrder._id)]);
  }

  imageClicked(i:number){
    console.log('');
    if(!this.isItImageEditComponent){
      return;
    }
    this.imageDetailEvent.emit(i);
  }

}


