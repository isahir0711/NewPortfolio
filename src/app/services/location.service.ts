import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  token = 'dce0ab37189e5d';
  constructor(private http:HttpClient) { }

  getCityAndState(ipAddress:string): Observable<any>{
    return this.http.get(`https://ipinfo.io/${ipAddress}?token=${this.token}`);
  }
}
