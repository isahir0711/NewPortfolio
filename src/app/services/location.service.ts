import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Location, webSocketMessage } from '../dtos/location';
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  socketURL = environment.socketURL;

  private socket$!: WebSocketSubject<any>;

  connectWebSocket(){
    this.socket$ = webSocket(this.socketURL);
  }

  sendIp(ipAddress: string) {

    const message: webSocketMessage = {
      ipAddress: ipAddress
    };

    this.socket$.next(message);
  }

  endConnection() {
    this.socket$.complete();
  }

  fetchMessage(): Observable<Location> {
    return this.socket$.asObservable();
  }

  
}
