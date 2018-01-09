import { Injectable } from '@angular/core';
import {AppVariablesService} from "./appVariables.service";
import {isUndefined} from "util";

@Injectable()
export class HelperService {

  constructor(private appVariablesService:AppVariablesService) { }

  isLoggedIn(){
    return localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id) !== null;
  }

}
