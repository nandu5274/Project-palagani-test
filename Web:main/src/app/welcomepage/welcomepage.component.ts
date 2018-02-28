import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from '../AppService.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as constants from '../constants';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  ///////// variables///////////////////
  user: any;
  filedata: any;
  loginUser = {

    userName: "",
    acesstype: "N",
    password: ""
  }

  signup = {

    username: "",
    acesstype: "N",
    password: "",
    repeatPassword: "",

  }
  public loginPopUpErrorMessage: any;
  public signupPopUpErrorMessage:any;
  public signupPopUpSucessMessage:any;
  public hidevalue: Boolean;
  public signupSucessHidevalue: Boolean;
  public signupFailureHidevalue:Boolean;
  public signupPopUpFailureMessage:any;
  public signinSucessHidevalue: Boolean;
  public loginPopUpSucessMessage:any;
  ///////// variables///////////////////

  //////urls///////////

  private checkUrl: string = constants.PALAGANI_URL+"/palagani/checkAccess/nandu";
  private loginUrl: string = constants.PALAGANI_URL+ "/palagani/signin";
  private signupUrl: string = constants.PALAGANI_URL+"/palagani/signup";
  //////urls///////////



  constructor( public ngProgress: NgProgress,public dataService: AppService,
    private router: Router
    ) {

    /*
     this.dataService.Get(this.checkUrl).subscribe(users =>{
   
       console.log(users);
      
       var errorFields = users;
    console.log(errorFields.message)
     },
     error => {
       this.loginerror(error);
     }
   
   );
   
    */

    this.hidevalue = false;
  }
  ngOnInit() {
  }

/////////////////// login event////////////////
  loginEvent() {
    this.hidevalue = false;
    this.dataService.Post(this.loginUrl, this.loginUser).subscribe(users => {

      console.log(users);

      var errorFields = (users);
      console.log(errorFields.message)
      this.loginSucess(users);
    },
      error => {
        this.loginerror(error);
      }

    );


  }
  /////////////////// login event////////////////
  public loginSucess(data) {
    this.hidevalue = false;
    var errorFields = (data);
    if (errorFields.message == "login successful") {
      this.signinSucessHidevalue = true;
      this.hidevalue = false;
      this.loginPopUpSucessMessage = errorFields.message;
      this.ngProgress.start();
      setTimeout(() => this.router.navigateByUrl('home'), 2000) ;
    }
  }

  public loginerror(data) {
    var errorFields = (data);
    if (errorFields.message == "login failed") {

      this.loginPopUpErrorMessage = errorFields.message;
      this.hidevalue = true;
      this.signinSucessHidevalue = false;
    }

  }


  signupevent() {

    this.dataService.Post(this.signupUrl, this.signup).subscribe(users => {

      console.log(users);

      var errorFields = (users);
      console.log(errorFields.message);
      this.signupsucess(users);
    },
      error => {
        this.signuperror(error);
      }


    );



  }

  public signupsucess(data) {
    this.signupSucessHidevalue = true;
    this.signupFailureHidevalue = false;
    var sucessFields = (data);
this.signupPopUpSucessMessage = sucessFields.message;

  }


  public signuperror(error) {
    this.signupSucessHidevalue = false;
    this.signupFailureHidevalue = true;
    var sucessFields = (error);
this.signupPopUpFailureMessage = sucessFields.message;

  }





  public clear() {
    this.hidevalue = false;
    this.loginUser.userName = "";
    this.loginUser.password = "";
    this.loginPopUpSucessMessage = false;
    
  }

  public signupclear(){
    this.signupSucessHidevalue = false;
    this.signupFailureHidevalue = false;
  }





}
