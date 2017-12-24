import {Injectable} from '@angular/core';

@Injectable()
export class AppVariablesService {

  constructor() {
  }

  FRONTEND_ORDER_IMAGE_EDIT_PAGE_URL(id){
    return `neworder/${id}/imageEdit`;
  }

  readonly FRONTEND_LOGIN_PAGE_URL = 'login';
  readonly FRONTEND_SIGNUP_PAGE_URL = 'signup';
  readonly FRONTEND_ORDER_DETAIL_URL = 'orderdetail';
  readonly FRONTEND_ALL_ORDERS_URL = 'allorders';
  readonly FRONTEND_NEW_ORDER_URL = 'neworder';
  readonly FRONTEND_ORDER_PAGE_URL = 'orderCarService';
  // readonly FRONTEND_ORDER_IMAGE_EDIT_PAGE_URL = 'neworder/:id/imageEdit';
  public FRONTEND_Keyword = '';
  public previousSRPURL  = "/";
  public previousSRPQueryParams  = {};
  public LOCALSTORAGE_user_id  = 'user_id';
  public LOCALSTORAGE_user_fullName  = 'userFullName';

  // readonly BACKEND_SERVER_URL = 'https://shielded-harbor-17443.herokuapp.com';
  readonly BACKEND_SERVER_URL = 'https://cartisanappnodejs.herokuapp.com';

  public BACKEND_SIGNUP_URL = this.BACKEND_SERVER_URL + '/users/signup';
  public BACKEND_LOGIN_URL =  this.BACKEND_SERVER_URL+ '/users/login';
  public BACKEND_UPLOAD_URL =  this.BACKEND_SERVER_URL+ '/upload';
  public BACKEND_GETALLORDERS_URL =  this.BACKEND_SERVER_URL+ '/getallorders';
  public BACKEND_GETORDER_URL =  this.BACKEND_SERVER_URL+ '/getorder';
  public BACKEND_ORDER_SAVE_URL =  this.BACKEND_SERVER_URL+ '/users/saveorder';
  public BACKEND_ORDER_UPDATE_URL =  this.BACKEND_SERVER_URL+ '/users/updateorder';

}
