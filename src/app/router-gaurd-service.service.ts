import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {HelperService} from "./helper.service";

@Injectable()
export class RouterGaurdServiceService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {
    if (this.helperService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }

  constructor(private helperService: HelperService, private router: Router) {
  }

}
