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

  constructor() {}

  ngOnInit() {}

  login() {
    console.log(this.nombre);
    console.log(this.password);

    //let usuario = new Usuario();
    let usuario: Usuario | undefined;
    usuario = {
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
