import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket //xx
  ){
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  // Emitir todos los eventos que dispara angular

  emit( evento: string, payload?: any, callback?: VoidFunction){//se usa cualquier nombre
    // emit('EVENTO', payload, callback?)
    console.log('Emitiendo', evento);
    this.socket.emit( evento, payload, callback); // Linea 11
  }

  //escuchar evento que emita el servidor
  listen( evento: string ){
    return this.socket.fromEvent( evento );
  }

}
