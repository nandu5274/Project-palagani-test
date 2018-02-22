import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage.component';
import { GraphpageComponent } from '../graphpage/graphpage.component';
import { OutletContext } from '@angular/router/src/router_outlet_context';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { HotelComponent } from '../hotel/hotel.component';
import {DataTableModule} from "angular2-datatable";
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material';
@NgModule({
  declarations: [
   
    HomepageComponent,
    GraphpageComponent

  ],

  imports: [
    RouterModule.forChild([
        {path: 'home', component: HomepageComponent ,
            children:[
              {
                path: 'graph',
                component: GraphpageComponent
              },
              {
                path: 'hotel',
                component: HotelComponent
              },
            ]
      },
        
    ]),
   

    CommonModule,
    ChartsModule,
    DataTableModule,
    Daterangepicker,
    FormsModule,
    MatDatepickerModule,


    
  ],

  providers: [DatePipe],
})
export class Homepagemodule{ }
