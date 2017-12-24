import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {AppVariablesService} from "./appVariables.service";
import {CartisanUser} from "./Models";
import {Http} from "@angular/http";

@Injectable()
export class ServerService {


  resultsArrivedEventEmitter:EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient:HttpClient, private appVariablesService:AppVariablesService) { }

  makePostRequest(url,bodyObj){
    return this.httpClient.post(url, bodyObj);
  }
  makeGetRequest(url){
    let user_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id);
    return this.httpClient.get(url+`&user_id=${user_id}`);
  }
  performSearch(keyword){
    if(!keyword){
      keyword="";
    }
   this.makeGetRequest(this.appVariablesService.BACKEND_GETALLORDERS_URL+ '?'+`keyword=${keyword}`)
      .subscribe(value=>{
        console.log("inside display",value);
        this.resultsArrivedEventEmitter.emit(value);

  });

  }

  login(user:CartisanUser){
    console.log('making post for login with following:', user);
    return this.httpClient.post(`${this.appVariablesService.BACKEND_LOGIN_URL}`,user)
      // .map((response)=>response)
      // .catch((err)=> Observable.throw(err.json()));
  }
  signup(user:CartisanUser){
    console.log('making post for signup with following:', user);
    return this.httpClient.post(`${this.appVariablesService.BACKEND_SIGNUP_URL}`,user)
      // .map((response:Response)=>response.json())
      // .catch((err:Response)=> Observable.throw(err.json()));
  }

}
