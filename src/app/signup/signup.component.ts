import {Component, OnInit, ViewChild} from '@angular/core';
import {CartisanUser} from "../Models";
import {HelperService} from "../helper.service";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {AppVariablesService} from "../appVariables.service";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  @ViewChild('f') form;//TODO: remove this
  showErrorMessage = false;
  helper_message = "";
  isItSignUpPage:boolean = false;
  makeGetRequestForFaceBook(  ){
    this.helperService.makeGetRequestForFaceBook();
  }
  showMessageForGivenTime(message:string, duration:number=3000){
    this.helper_message=message;
    this.showErrorMessage = true;
    setTimeout(()=>{this.showErrorMessage=false},duration);
  }
  onSubmit() {
    console.log(this.form);
    if(!this.form.valid){
      this.showMessageForGivenTime("Please fill the form correctly");
      return;
    }

    if(this.form.value.password!==this.form.value.confirm_password){ //This is better than *ngIf
      this.showMessageForGivenTime("Passwords must match");
      return;
    }

    this.showMessageForGivenTime("Sending details to server...");
    let user:CartisanUser = {userCustomID:this.form.value.username,
      userFullName:this.form.value.full_name,
      userPassword:this.form.value.password,
      userEmail:this.form.value.email,
      userRole:this.form.value.role,
      userMobileNumber:this.form.userMobileNumber
    };


    this.serverService.signup(user).subscribe(
      (value:any) => {

      this.showMessageForGivenTime(value.message);
      if(value.problem){//TODO: THIS IS A WORKAROUND, CODE MUST WORK WITHOUT IT
        return;
      }
      console.log(value);

        // if(value.message==='user created'){
        //   this.helper_message = 'Sign Up done.Logging in!';
        // }
        //after sign up is done, log user in
        const user:CartisanUser = {
          userFullName: this.form.value.full_name,
          userEmail:this.form.value.email,
          userPassword:this.form.value.password,
        };//TODO: fill all the details

        //LOGIN STARTS
        this.serverService.login(user).subscribe(
          (data:any) =>{
            console.log('saved in local stogare',data);
            localStorage.setItem('token',data.token);
            localStorage.setItem(this.appVariablesService.LOCALSTORAGE_user_id,data.user._id);
            localStorage.setItem('fullName',data.user.userFullName);
            localStorage.setItem('fullName',data.user.userFullName);
            localStorage.setItem('userRole',data.user.userRole);
            this.router.navigateByUrl('/');
            // this.router.navigate([this.appVariablesService.previousSRPURL]);
            // this.global.setLoggedInUserDetails(user);//TODO: in
            // this.helper.showNotificationBarEvent.emit({message:'Signup done. You are logged in'});//TODO: in SS
          },
          error => {
            console.log(error);
            this.showMessageForGivenTime(error.error.message);
          }
        );
        //LOGIN ENDS

      },
      (error) => {

        console.log(error);//TODO improve error.error
        // if(error.error.problem){
          this.showMessageForGivenTime(error.error.message);
          // return;
        // }

        // this.helper_message = error.problem_message;
        console.log(error);
      });
  }
  constructor(private helperService: HelperService,
              private router:Router,
              public serverService:ServerService,
              public appVariablesService:AppVariablesService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    console.log("sssssssssssssssssssssssssssssssssssssss");;
  //   this.activatedRoute.data.subscribe((data)=>{
  //     console.log(data);
  //     this.isItSignUpPage = data.isItSignUpPage;;
  //   });
  //   this.global.showSearchBarBoolean=false;
  }

}
