import { Component, OnInit } from '@angular/core';
import { UsuarioAlertsComponent } from '../usuario-alerts/usuario-alerts.component';
import { Usuario } from '../usuarios';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  password: string;
  mensaje: string;

  loginGroup: FormGroup;

  //let usuario = new Usuario();
  usu: Usuario | undefined;

  //loginGroup;
  //errMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: ''
    });
  }

  ngOnInit() {}

  login() {
    this.mensaje = '';
    console.log(this.usuario);
    console.log(this.password);

    if (!this.password || !this.usuario) {
      this.mensaje = 'Debe ingresar el nombre y password';
      window.alert(this.mensaje);
    }

    this.usu = {
      id: 1,
      usuario: this.usuario,
      password: this.password,
      apiKey: ''
    };

    this.router.navigate(['/dashboard']);
  }

  formSubmit() {
    this.mensaje = '';
    const { usuario, password } = this.loginGroup.value;
    this.userService.login(usuario, password).subscribe(
      user => {
        this.userService.setUser(user);
        console.log(user);
        this.router.navigate(['/dashboard']);
      },
      ({ error: { msg } }) => {
        this.mensaje = msg;
      }
    );
  }

  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}
