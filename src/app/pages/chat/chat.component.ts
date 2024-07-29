import { WebSocketService } from '../../services/web-socket.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  message = '';
  messages: string[] = [];
  clientID = ''

  constructor(private WebSocketService: WebSocketService) {

    this.WebSocketService.Messages$.subscribe((blob: any) => {
      if (blob instanceof Blob) {
        blob.text().then((message) => {
          this.messages.push(message);
        });
      } else {
        console.log('Data receveid is not a Blob')
      }
      });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.WebSocketService.sendMessage(this.message);
      this.message = '';
    }
  }
}
