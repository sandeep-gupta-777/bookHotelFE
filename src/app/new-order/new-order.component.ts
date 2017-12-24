import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppVariablesService} from "../appVariables.service";
import {CartisanOrder} from "../Models";
import {ServerService} from "../server.service";
import {Router} from "@angular/router";
import {HelperService} from "../helper.service";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  showErrorMessage = false;
  message = "Please fill all fields correctly";
  showMessageForGivenTime(message:string, duration:number=5000){
    this.message=message;
    this.showErrorMessage = true;
    setTimeout(()=>{this.showErrorMessage=false},duration);
  }
  constructor (private httpClient:HttpClient,
               private appVariablesService:AppVariablesService,
               private helperService:HelperService,
               private elementRef:ElementRef,
               private serverService:ServerService,
               private router:Router
  ){}

  currentCartisanOrder:CartisanOrder  = {orderImageContainersArray:[]};


  ngOnInit(): void {
    this.currentCartisanOrder.orderImageContainersArray = [];
  }


  onSubmit(form){
    if(!form.valid){
      this.showMessageForGivenTime("Please fill all details correctly");
      return;
    }
    if(this.currentCartisanOrder.orderImageContainersArray.length===0)
    {
      this.showMessageForGivenTime("Please upload atleast one image of your car");
      return;
    }
    console.log(form.value);
    this.currentCartisanOrder = {...this.currentCartisanOrder ,...form.value,};
    this.currentCartisanOrder.orderAssignedBy_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id);
    this.currentCartisanOrder.orderDate = Date.now();
    this.currentCartisanOrder.orderAssignedBy_fullName= localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_fullName);

    this.serverService.makePostRequest(this.appVariablesService.BACKEND_ORDER_SAVE_URL, this.currentCartisanOrder)
      .subscribe((value:any)=>{
        console.log(value);
        this.router.navigate([this.appVariablesService.FRONTEND_ORDER_DETAIL_URL,value._id])
      })
  }

  upload() {//TODO: shift this to server service

    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.elementRef.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.

    if(fileCount===0){
      this.showMessageForGivenTime("Please choose a file first");
      return;
    }
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('photo', inputEl.files.item(0));
      console.log(formData);
        this.showMessageForGivenTime("Uploading image...");
      //call the angular http method
      this.httpClient
      //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post(this.appVariablesService.BACKEND_UPLOAD_URL, formData).subscribe(
        //map the success function and alert the response

        (success:any) => {
          inputEl.value="";
          this.showMessageForGivenTime("Image uploaded!",5000);
          this.currentCartisanOrder.orderImageContainersArray.push({orderImageURL:success.href});
          console.log(this.currentCartisanOrder);
        },
        (error) => alert(error))
    }
  }


}
