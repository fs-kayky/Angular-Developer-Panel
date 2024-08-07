import { WebSocketService } from '../../services/web-socket.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observer } from 'rxjs';
import { IMessages } from '../../../interfaces/IMessages';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  message = '';
  messages: IMessages[] = [];
  clientID = ''
  msg = {}

  constructor(private WebSocketService: WebSocketService) {

    this.WebSocketService.Messages$.subscribe((blob: any) => {
      if (blob instanceof Blob) {
        blob.text().then((message) => {
          this.messages.push({ content: `${message}`, sender: 'server' });
        });
      }
      });

      this.WebSocketService.userID$.subscribe((id: any) => {
        if (typeof id === 'string') {
          this.clientID = JSON.parse(id).id;
        }
      })

  }

  teste(msg: any) {
    console.log(msg)
  }


  sendMessage() {
    if (this.message.trim()) {
      this.WebSocketService.sendMessage(this.message);
      this.messages.push({ content: `${this.message}`, sender: 'client' });
      this.message = '';
    }
  }
}
