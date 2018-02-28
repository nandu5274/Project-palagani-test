import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule, MatButtonModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import {HttpModule} from '@angular/http';
import { AppService } from './AppService.service';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';
import { GraphpageComponent } from './graphpage/graphpage.component';
import { Homepagemodule } from './homepage/homepage.module';
import { HotelComponent } from './hotel/hotel.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MatDatepicker, MatDatepickerModule,MatNativeDateModule,MatInputModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomepageComponent,
    HotelComponent,
    
 
    
    

    

  ],

  imports: [
    BrowserModule,
    MatSelectModule, 
    MatButtonModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,

    HttpClientModule,
    NgProgressModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    Daterangepicker,

    RouterModule.forRoot(
    [
      {
        path:'home',
        loadChildren: './homepage/homepage.module#Homepagemodule' 

      },
      {
        path:'welcome',
        component: WelcomepageComponent
      },

      
      {path: '',redirectTo:'/welcome',pathMatch:'full'},
      {path: '**',redirectTo:'/welcome',pathMatch:'full'}

    ]
    ),
    Homepagemodule
  ],

  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
