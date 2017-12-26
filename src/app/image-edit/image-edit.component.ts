import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {CartisanOrder, ImageTagArray, OrderImageContainer} from "../Models";
import {ActivatedRoute} from "@angular/router";


// import $ from 'jquery';

import {HelperService} from "../helper.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit,AfterViewInit {


  currentImageContainerBeingEdited: OrderImageContainer;
  currentOrderObservable: Observable<CartisanOrder>;
  currentImageContainerIndexBeingEdited: number = 0;
  makeImageSemiTransparent = false;
  currentOrder: CartisanOrder;
  currentImageURL: String = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkadsYJoVDlWZ6IbaBDHQBCr8xqf9tghiiGd1kUosjQfa87EwDxA";//TODO: replace with default pic
  elementArray: ImageTagArray[] = [];
  showDiv = false;
  toolTipText = "";

  @ViewChild("bigImage") bigImageElement: ElementRef;

  constructor(private serverService: ServerService,
              private appVariablesService: AppVariablesService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  saveTagsToServer() {
    this.currentOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImageTagArray = this.elementArray;
    // (<any>$('[data-toggle="tooltip"]').tooltip());
    let orderImageContainersArray = this.currentOrder.orderImageContainersArray;
    console.log(this.currentOrder.orderImageContainersArray);
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_ORDER_SAVE_URL, {
      orderImageContainersArray,
      _id: this.currentOrder._id
    })
      .subscribe((value) => {
        console.log(value);
        alert('saved');
      });
  }

  UndoTag() {
    this.elementArray.pop();
    alert("Tag removed");
  }

  editedImageChanged(j: number) {
    console.log('edited image changed');
    this.currentOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImageTagArray = this.elementArray;
    this.elementArray = this.currentOrder.orderImageContainersArray[j].orderImageTagArray;
    this.currentImageContainerBeingEdited = this.currentOrder.orderImageContainersArray[j];
    this.currentImageURL = this.currentImageContainerBeingEdited.orderImageURL;
    this.currentImageContainerIndexBeingEdited = j;

    if (!this.elementArray) this.elementArray = [];
  }

  mouseoverOutOFTag() {
    this.makeImageSemiTransparent = false;
  }

  mouseoverOnTag() {
    this.makeImageSemiTransparent = true;
  }

  removeEmptyTagsOrUnsaved() {
    // this.currentOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImageTagArray.forEach((element, index, array) => {
    this.elementArray.forEach((element, index, array) => {
      if (!element.toolTipText || element.toolTipText === "") {
        this.elementArray.splice(index, 1);
      }
    });
    // this.elementArray.pop();
  }

  addNewTagToImage(event) {
    if(this.helperService.isItWorkshopRole()) return;
    this.makeImageSemiTransparent = true;
    console.log(event);
    this.showDiv = true;
    if (!this.currentOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImageTagArray)//TODO
      this.currentOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImageTagArray = [];

    this.removeEmptyTagsOrUnsaved();
    // let element = document.getElementById('imageT');//TODO: viewChild instead
    let element = this.bigImageElement.nativeElement;
    let clickLocationObj = this.helperService.imageClickLocationAsPercent(element, event);
    this.elementArray.push({...clickLocationObj, inputHidden: false});
  }

  doneClicked(i: number, toolTipText: String) {

    this.elementArray[i].toolTipText = toolTipText;
    this.elementArray[i].toolTipTextVisible = true;
    this.elementArray[i].inputHidden = true;
    console.log(this.elementArray);
    this.makeImageSemiTransparent = false;
  }
  ngAfterViewInit(): void {
    console.log(111111111111111111111);
    // $(function () {
    //   console.log($('[data-toggle="tooltip"]'));
    //
    // })
  }

  ngOnInit() {



    let tempCurrentOrder_id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.currentOrderObservable = this.serverService.makeGetRequest(this.appVariablesService.BACKEND_GETORDER_URL + `?order_id=${tempCurrentOrder_id}`);
    this.currentOrderObservable.subscribe((value: CartisanOrder) => {//TODO: use async pipe instead
      console.log(value);
      this.currentOrder = value;
      try {
        this.elementArray = this.currentOrder.orderImageContainersArray[this.currentImageContainerIndexBeingEdited].orderImageTagArray;
        if (!this.elementArray) this.elementArray = [];
      }
      catch (error) {
        console.log(error);
        this.elementArray = [];
      }
    })
  }
}
