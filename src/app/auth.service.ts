import { Injectable } from '@angular/core';
import {AppVariablesService} from "./appVariables.service";

@Injectable()
export class AuthService {

  constructor(private appVariablesService:AppVariablesService) { }

  isUserLoggedIn(){
    return localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id)!== null;
  }

}
