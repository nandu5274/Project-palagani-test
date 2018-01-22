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
import {HomepageComponent} from './homepage/homepage.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomepageComponent,
    HomepageComponent,

    

  ],

  imports: [
    BrowserModule,
    MatSelectModule, 
    MatButtonModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
    [
      {
        path:'home',
        component: HomepageComponent

      },
      {
        path:'welcome',
        component: WelcomepageComponent
      },
      {path: '',redirectTo:'/welcome',pathMatch:'full'},
      {path: '**',redirectTo:'/welcome',pathMatch:'full'}
    ]
    )
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
