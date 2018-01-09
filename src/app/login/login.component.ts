import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../Models";
import {HelperService} from "../helper.service";
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showErrorMessage = false;
  helper_message = "";



  constructor(private helperService:HelperService,
              private serverService:ServerService,
              public appVariable:AppVariablesService,
              private authService:AuthService,
              private router:Router,private activatedRoute:ActivatedRoute) {
  }
  @ViewChild('f') form;

  showMessageForGivenTime(message:string, duration:number=3000){
    this.helper_message=message;
    this.showErrorMessage = true;
    setTimeout(()=>{this.showErrorMessage=false},duration);
  }

  onSubmit() {

    // if(!this.form.valid){
    //
    //   this.showMessageForGivenTime('Please fill all inputs correctly');
    //   return;
    // }
    console.log(this.form);
    const user:Customer = this.form.value;
    this.serverService.login(user).subscribe(

      (value:Customer) =>{

        console.log('saved in local stogare',value);
        localStorage.setItem('user_id',value._id);
        localStorage.setItem('userFullName',value.customerFullName);
        this.router.navigate([this.appVariable.previousSRPURL]);
      },
      (error )=> {

        console.log(error);//TODO improve error.error
        this.showMessageForGivenTime(error.error.message);
      }
    );
  }

  ngOnInit() {}

}
