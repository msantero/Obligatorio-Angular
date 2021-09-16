import { Component, OnInit } from '@angular/core';
import { UsuarioAlertsComponent } from '../usuario-alerts/usuario-alerts.component';
import { Usuario } from '../usuarios';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  msg: string;

  loginGroup: FormGroup;

  //let usuario = new Usuario();
  usu: Usuario | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: '',
    });
  }

  ngOnInit() {}

  /*
  login() {
    this.msg = '';
    console.log(this.usuario);
    console.log(this.password);

    if (!this.password || !this.usuario) {
      this.msg = 'Debe ingresar el nombre y password';
      window.alert(this.msg);
    }

    this.usu = {
      id: 1,
      usuario: this.usuario,
      password: this.password,
      apiKey: ''
    };

    this.router.navigate(['/dashboard']);
  }
*/

  login() {
    this.msg = 'Ingresando...';
    const { usuario, password } = this.loginGroup.value;
    if (!usuario || !password) {
      this.msg = 'Debe ingresar el nombre y password';
    } else {
      this.msg = 'Logueando...';

      this.userService.login(usuario, password).subscribe(
        (user) => {
          this.userService.setUser(user);
          console.log(user);
          this.router.navigate(['/dashboard']);
        },
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error:' + this.msg);
        }
      );
    }

    console.log(this.msg + 'usu y pass ingresado:' + usuario + password);
    console.log(this.userService.user?.apiKey);
  }

  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}
