import { Component, OnInit } from '@angular/core';
import { UsuarioAlertsComponent } from '../usuario-alerts/usuario-alerts.component';
import { Usuario } from '../usuarios';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre: string;
  password: string;
  mensaje: string;

  //let usuario = new Usuario();
  usuario: Usuario | undefined;

  constructor() {}

  ngOnInit() {}

  login() {
    this.mensaje = '';
    console.log(this.nombre);
    console.log(this.password);

    if (!this.password || !this.nombre) {
      this.mensaje = 'Debe ingresar el nombre y password';
      window.alert(this.mensaje);
    }

    this.usuario = {
      id: 1,
      nombre: this.nombre,
      password: this.password,
      token: ''
    };
  }

  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}
