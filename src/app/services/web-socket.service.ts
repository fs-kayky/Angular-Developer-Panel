import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private Socket: WebSocket;
  private messageSubject = new Subject<Blob>();

  constructor() {
    this.Socket = new WebSocket('ws://localhost:3002');
    this.Socket.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };
  }

  sendMessage(message: string) {
    this.Socket.send(message);
  }

  get Messages$() {
    return this.messageSubject.asObservable();
  }


}
