import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { AppService } from '../AppService.service';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

///////// variables///////////////////
  user:any;
  filedata: any;
 loginUser = {

        userName:"",
        acesstype:"N",
        password:""
  }

  signup = {

    username:"",
    acesstype:"N",
    password:"",
    repeatPassword:"",

}
private loginPopUpErrorMessage: any;
private hidevalue: Boolean;  
///////// variables///////////////////

//////urls///////////
 
  private checkUrl: string = "http://localhost:8081/palagani/checkAccess/nandu";
  private loginUrl: string = "http://localhost:8081/palagani/signin";
  private signupUrl: string = "http://localhost:8081/palagani/signup";
//////urls///////////



constructor(public dataService:  AppService,private router: Router){

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


  loginEvent()
  {
    this.hidevalue = false;
    this.dataService.Post(this.loginUrl,this.loginUser).subscribe(users =>{

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
  public loginSucess(data) 
  {
    this.hidevalue = false;
    var errorFields = (data);
    if(errorFields.message == "login successful")
    {
    this.router.navigateByUrl('home');
    }
  }

  public loginerror(data) 
  {
    var errorFields = (data);
    if(errorFields.message == "login failed")
    {
      
      this.loginPopUpErrorMessage = errorFields.message;
      this.hidevalue = true;
    }
  
  }


  signupevent()
  {

    this.dataService.Post(this.signupUrl,this.signup).subscribe(users =>{

      console.log(users);
     
      var errorFields = (users);
   console.log(errorFields.message)
    });



  }


  public clear(){
    this.hidevalue = false;
    this.loginUser.userName = "";
    this.loginUser.password = "";

  }

  



}
