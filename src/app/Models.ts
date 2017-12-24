/**
 * Created by sandgup3 on 17/12/2017.
 */
export interface CartisanUser {

  _id?:string,

  userCustomID?: string,
  userPassword?: string,
  userFullName?: string,
  userEmail?: string,
  userMobileNumber?: string,
  userRole?: string,

  userProfileID?: string,  userProfilePicURL?: string,  userVotes?: string[], userComments?: { comment: string; image: string }[],
  userUploaded?: string[],   userDateOfSignup?: Date,   userLastLogin?: Date
}

export interface CartisanOrder {//TODO: remove ?

  _id?:string,
  orderModelName?:string
  orderSerialNumber?: string,
  orderDate?: number,
  orderTitle?: string,
  orderHTML?:String,
  orderText?:String,
  orderAssignedBy_id?:string,
  orderAssignedBy_fullName?:string,
  orderAssignedTo_id?:string,
  orderAssignedTo_fullName?:string,
  orderEstimaterPrice?:String,
  orderAddress?:String,
  orderImageContainersArray?:OrderImageContainer[],
  orderPriceEstimationMode?:number,
  orderTotalPrice?:Number
}
export interface OrderImageContainer{
  orderImageURL?:String,
  orderImageTagArray?:ImageTagArray[],
  orderImagePrice?:number
}

export interface ImageTagArray{
  toolTipText?: String,
  toolTipTextVisible?: boolean,
  inputHidden: boolean,
  clientX?: number,
  clientY?: number
}
