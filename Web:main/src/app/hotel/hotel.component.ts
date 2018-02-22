import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from '../AppService.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
declare var moment:any;
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

 


currentdate: any;

 sumamount :any;

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

private HotelRecords = [];

///////////////////urls//////////////////////

private getHotelRecordsBydateUrl: string = "http://localhost:8081/palagani/hotel/getOrders/";
///////////////////urls//////////////////////



  constructor(private datePipe: DatePipe,public dataService: AppService, private daterangepickerOptions: DaterangepickerConfig) { 
    
  }


  ngOnInit() {
   
    this.getHotelRecordsBydateEvent(); 
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers



  }
  getHotelRecordsBydateEvent()
  {

    var date = new Date();
    this.currentdate = this.datePipe.transform(date,"dd-MM-yy");
    console.log(this.datePipe.transform(date,"dd-MM-yy"));
    console.log(this.getHotelRecordsBydateUrl+this.currentdate);
    this.currentdate = "12-01-18";
    this.dataService.Get(this.getHotelRecordsBydateUrl+this.currentdate).subscribe(users => {
      console.log(users);
      this.getHotelRecordsBydateSucess(users);
    },
      error => { 
      }
    );

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
      locale: { format: 'YYYY-MM-DD' },
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
  }

}
