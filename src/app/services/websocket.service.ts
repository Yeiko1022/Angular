import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(
    private socket: Socket //
  ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(): void {
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

  emit(evento: string, payload?: any, callback?: Function) {
    // se usa cualquier nombre
    // emit('EVENTO', payload, callback?)
    console.log('Emitiendo', evento);
    this.socket.emit(evento, payload, callback); // Linea 11
  }

  // escuchar evento que emita el servidor
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {

    return new Promise((resolve, reject) => {
      // console.log('Configurando', nombre);
      this.emit('configurar-usuario', { nombre }, (resp) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();

        resolve();
      });
    });
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage(){
    if (localStorage.getItem('usuario')) {

      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  }
}
