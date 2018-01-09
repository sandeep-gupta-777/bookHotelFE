import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {AppVariablesService} from "./appVariables.service";
import {Http} from "@angular/http";

@Injectable()
export class ServerService {


  resultsArrivedEventEmitter:EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient:HttpClient, private appVariablesService:AppVariablesService) { }

  makePostRequest(url,bodyObj){
    bodyObj.bookingCustomer_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id);
    return this.httpClient.post(url, bodyObj);
  }
  makeGetRequest(url){
    let user_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id);
    return this.httpClient.get(url+`&user_id=${user_id}`);
  }


  login(user:any){
    console.log('making post for login with following:', user);
    return this.httpClient.post(`${this.appVariablesService.BACKEND_LOGIN_URL}`,user)
  }
  signup(user:any){
    console.log('making post for signup with following:', user);
    return this.httpClient.post(`${this.appVariablesService.BACKEND_SIGNUP_URL}`,user)
  }

}
