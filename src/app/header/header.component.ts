import {Component, OnInit} from '@angular/core';
import {HelperService} from "../helper.service";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppVariablesService} from "../appVariables.service";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  keyword;
  constructor(public helperService: HelperService,
              private authService: AuthService,
              private appVariablesService: AppVariablesService,
              private serverService: ServerService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
  }

  ngOnInit() {

    // this.keyword = this.activatedRoute.snapshot.queryParamMap.get('keyword');//TODO: check why this is not working

    this.keyword = this.helperService.getQueryParam("keyword");
  }

  searchPerformed(keyword){
    // this.serverService.
    this.serverService.performSearch(keyword);
    this.appVariablesService.FRONTEND_Keyword = keyword;
    this.router.navigate([this.appVariablesService.FRONTEND_ALL_ORDERS_URL], {queryParams:{keyword:keyword}});
  }


  homeClicked(){
    // console.log('home clicked');
    this.router.navigate(["/"]);
    // document.getElementById("menu").classList.remove("show");
  }
  orderClicked(){
    this.router.navigate([this.appVariablesService.FRONTEND_NEW_ORDER_URL]);
  }

  goToLoginPage() {
    // document.getElementById("menu").classList.remove("show");
    // this.global.previousSRPURL = window.location.pathname;
    // this.global.previousSRPQueryParams = this.activatedRoute.snapshot.queryParams;
    // console.log('saved previous url');
    // this.router.navigate([this.global.loginURL]);
    this.router.navigate([this.appVariablesService.FRONTEND_LOGIN_PAGE_URL]);

  }

  logout() {
    // document.getElementById("menu").classList.remove("show");
    localStorage.clear();
    // this.global.previousSRPURL = window.location.pathname;
    // this.global.previousSRPQueryParams = this.activatedRoute.snapshot.queryParams;
    this.router.navigate(["/"]);
    // this.helper.showNotificationBarEvent.emit({message:'You are logged out!'});
  };


}
