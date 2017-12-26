import { Injectable } from '@angular/core';
import {AppVariablesService} from "./appVariables.service";
import {isUndefined} from "util";

@Injectable()
export class HelperService {

  constructor(private appVariablesService:AppVariablesService) { }

  getQueryParam(param:String) {
    let keyword="";
    let url_string = window.location.href;
    let url:any = new URL(url_string);
    keyword = url.searchParams.get(param);
    return keyword;
  }

  isLoggedIn(){
    return localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id) !== null;
  }
  imageClickLocationAsPercent(element:HTMLImageElement,event){
    // let element = this.bigImageElement.nativeElement;
    let image_width = element.offsetWidth;
    let image_height = element.offsetHeight;
    let imageLeftGap = element.getBoundingClientRect().left;
    let imageTopGap = element.getBoundingClientRect().top;
    let mouseX = event.clientX - imageLeftGap;
    let mouseY = event.clientY - imageTopGap;
    let xPercent = ((mouseX) / image_width) * 100;
    let yPercent = ((mouseY) / image_height) * 100;
    return {clientX: xPercent, clientY: yPercent};
  }

  makeGetRequestForFaceBook(){
    alert('Not Implemented');
  }

  isItWorkshopRole(){
    return localStorage.getItem('userRole')==="workshop_owner";
  }

}
