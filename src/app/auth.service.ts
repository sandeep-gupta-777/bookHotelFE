import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  isUserLoggedIn(){
    return localStorage.getItem('token')!== null;
  }

}
