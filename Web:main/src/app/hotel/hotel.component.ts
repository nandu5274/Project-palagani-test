import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from '../AppService.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import * as constants from '../constants';
import { NgProgress } from 'ngx-progressbar';


declare var $: any;

declare var moment:any;
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  @ViewChild('fileInput') fileInput:ElementRef;
  @ViewChild('singleDatePicker') singleDatePicker:ElementRef;
  @ViewChild('openSucesspopup') openSucesspopup:ElementRef;
  @ViewChild('closeSucesspopup') closeSucesspopup:ElementRef;
  @ViewChild('openAddOrderWaringPopupBtn') openAddOrderWaringPopupBtn:ElementRef;
  @ViewChild('closeAddOrderWarningpopup') closeAddOrderWarningpopup:ElementRef;

  
  
  
  test:any;
 
  isValid = true;
 
currentdate: any;

searchFromDate: any;

searchToDate:any;

 sumamount :any;

processingData= true;
clearCurrentdate : any;
AddOrderRequest = {

  createdAtS: "",
  totalAmount:"",
  usedAmount:"",
  profitAmount:"",


}

addPopupTotalAmount: any;

addPopupPaidAmount: any;

addPopupProfitAmount : any;

addPopupCreatedate:any;

HotelRecord = {
  id: 0,
  totalAmount: 0,
  usedAmount: 0,
  profitAmount: 0,
  month: "",
  year: "",
  createdAt: "",
  updatedAt: ""
}
popupDate: any;
public HotelRecords = [];
public singleDate: any;
///////////////////urls//////////////////////

private getHotelRecordsBydateUrl: string = constants.PALAGANI_URL + "/palagani/hotel/getOrders/";
private searchHotelRecordsBydateUrl: string = constants.PALAGANI_URL + "/palagani/hotel/search/";
private addHotelRecordUrl: string = constants.PALAGANI_URL + "/palagani/hotel/add";
///////////////////urls//////////////////////



  constructor(private datePipe: DatePipe,public dataService: AppService, 
    private daterangepickerOptions: DaterangepickerConfig, public ngProgress: NgProgress) { 
      this.singleDate = Date.now();   
 }

 
  ngOnInit() {
   
    this.getHotelRecordsBydateEvent(); 
    this.ngProgress.done();
    var date = new Date();
    this.searchFromDate = this.datePipe.transform(date,"dd-MM-yy");
    this.searchToDate = this.datePipe.transform(date,"dd-MM-yy");
    this.popupDate = this.datePipe.transform(date,"dd-MM-yy");
   this.test = this.datePipe.transform(date,"dd-MM-yy");
 
  

  }

  sum()
  {
    this.addPopupProfitAmount = this.addPopupTotalAmount - this.addPopupPaidAmount;
  }

  getHotelRecordsBydateEvent()
  {
    this.ngProgress.start();
    var date = new Date();
    this.currentdate = this.datePipe.transform(date,"dd-MM-yy");
    console.log(this.datePipe.transform(date,"dd-MM-yy"));
    console.log(this.getHotelRecordsBydateUrl+this.currentdate);
    
    this.dataService.Get(this.getHotelRecordsBydateUrl+this.currentdate).subscribe(users => {
      this.ngProgress.done();
      console.log(users);
      this.getHotelRecordsBydateSucess(users);
    },
      error => { 
      }
    );

  }

  public reloadGetHotelRecordsBydate()
{
  this.getHotelRecordsBydateEvent(); 
}  

  public getHotelRecordsBydateSucess(data)
  {
    var records = (data);

    this.HotelRecords = records.hotelDTO;
    this.sumamount = records.sumAmount;

  }

  

  ///////////date range/////////
  public daterange: any = {};
 
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
      locale: { format: 'DD-MM-YY' },
      alwaysShowCalendars: false,
  };

  

  public selectedDate(value: any, datepicker?: any) {
      // this is the date the iser selected
      console.log(value);

      // any object can be passed to the selected event and it will be passed back here
      datepicker.start = value.start;
      datepicker.end = value.end;

      // or manupulat your own internal property
      this.daterange.start = value.start;
      this.daterange.end = value.end;
      this.daterange.label = value.label;

      this.searchFromDate = value.start._d
      var date =this.searchFromDate;
    this.searchFromDate = this.datePipe.transform(date,"dd-MM-yy");
    this.searchToDate = this.datePipe.transform(value.end._d,"dd-MM-yy");

    console.log("from date = " +this.searchFromDate);
    console.log("to date = " +this.searchToDate);


    
  }
  public singlePicker = {
    locale: { format: 'DD-MM-YY' },
    singleDatePicker: true,
    showDropdowns: true,
    opens: "left"
  }


 
  public buttonsearch()
{
  this.ngProgress.start();
  this.searchEvent(this.searchFromDate,this.searchToDate);

}


  public searchEvent(searchFromDate: any, searchToDate: any) {

    this.dataService.Get(this.searchHotelRecordsBydateUrl+searchFromDate+"/"+searchToDate).subscribe(users => {
      console.log(users);
      this.searchHotelRecordsBydateSucess(users);
      this.ngProgress.done();
    },
      error => { 
      }
    );

  }

  public searchHotelRecordsBydateSucess(data)
  {
   
    var records = (data);

    this.HotelRecords = records.hotelDTO;
    this.sumamount = records.sumAmount;
  }
 //////////////////// popup  add order///////////////////
 public singleSelect(value: any)
  {
    console.log(value);
    this.addPopupCreatedate =  value.start; 
  
  }



  public addOrderEvent()
  {
    this.isValid = false;
     this.processingData = !this.processingData;
if(this.addPopupCreatedate == undefined)
{var date = new Date();
  this.currentdate = this.datePipe.transform(date,"dd-MM-yy");
  this.AddOrderRequest.createdAtS = this.currentdate;
  
}
else{
  this.AddOrderRequest.createdAtS = this.datePipe.transform(this.addPopupCreatedate,"dd-MM-yy");
  this.addPopupCreatedate = undefined;
}

this.AddOrderRequest.usedAmount = this.addPopupPaidAmount;
this.AddOrderRequest.totalAmount = this.addPopupTotalAmount;
this.AddOrderRequest.profitAmount = this.addPopupProfitAmount;

     this.dataService.Post(this.addHotelRecordUrl, this.AddOrderRequest).subscribe(users => {

      console.log(users);

      var errorFields = (users);
     this.addOrderSucessEvent(users);
      
    },
      error => {
    
      }
    );






    
  }


  public  addOrderSucessEvent(data)
  {

    if(data.status == "OK")
    {
    console.log( data.message);
    data.message;
    this.fileInput.nativeElement.click();
    setTimeout(()=>{ this.openSucesspopup.nativeElement.click()}, 1000)
    setTimeout(()=>{ this.closeSucesspopup.nativeElement.click()}, 2000)
    }
    if(data.status == "PRECONDITION_FAILED")
    {
      this.processingData = true;
      this.openAddOrderWaringPopupBtn.nativeElement.click();
      setTimeout(()=>{ this.closeAddOrderWarningpopup.nativeElement.click()}, 1200)
     
    }
  }


  public addOrderErrorEvent(data)
  {


  }

  public addOrderButtonClear()
  {
    var date = new Date();
    this.singleDate = this.datePipe.transform(date,"dd-MM-yy");

    this.singleDatePicker.nativeElement.value = this.singleDate;
     this.processingData = true;
     this.addPopupPaidAmount = "";
     this.addPopupTotalAmount = "";
     this.addPopupProfitAmount = "";
 
  }





 //////////////////// popup add order///////////////////

}

