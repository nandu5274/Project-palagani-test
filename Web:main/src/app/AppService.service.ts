import { Injectable} from '@angular/core';
import {RequestOptionsArgs,RequestOptions,Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppService{
    protected headers: HttpHeaders;
    constructor(public http:HttpClient){
      
        //this.headers.append('Content-Type', 'application/json');
    }

    Get(url: string) : Observable<any> 
    {



        let headers = new Headers();
        let requestOptions = new RequestOptions({ headers: headers });
        //headers.append('Content-Type', 'application/json');
      
  

        return this.http.get(url).map(res =>res)
        ;
    }


    Post(url:string,data:any) : Observable<any> 
    {
      
  
       
  
        return this.http.post(url,JSON.stringify(data),{
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
          }).map((res: Response) => res).catch(this.handleError);
    }

    private handleError(error:Response | any) {
        console.error(error.Response);
        return Observable.throw(error.error);
    }
}