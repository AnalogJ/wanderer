import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private apiBaseUrl = 'https://api.ruelette.com/dev/';  // URL to web API

  constructor(private http: Http) { }

  connectServiceUrl(serviceType): Observable<any>  {
    return this.http.get(this.apiBaseUrl + 'connect/' + serviceType)
        .map(this.extractData)
        .catch(this.handleError);
  }

  callbackWithToken(serviceType, postData): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBaseUrl + 'callback/' + serviceType, postData, options)
        .map(this.extractData)
        .catch(this.handleError);
  }




  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
  }
}
