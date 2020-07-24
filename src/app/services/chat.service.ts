import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {// responsable de comunicación entre usuarios

  constructor(
    public wsService: WebsocketService


  ) { }


  sendMessage(mensaje: string) {
    const payload = {
      de: 'Yeison',
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);

  }

  getMessage() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
