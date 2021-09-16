import { Component, OnInit } from '@angular/core';
import { UsuarioAlertsComponent } from '../usuario-alerts/usuario-alerts.component';
import { Usuario } from '../usuarios';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: string;
  password: string;
  passwordreplay: string;
  msg: string;

  registroGroup: FormGroup;

  //let usuario = new Usuario();
  usu: Usuario | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registroGroup = this.formBuilder.group({
      usuario: '',
      password: '',
      passwordreplay: '',
    });
  }

  ngOnInit() {}

  registro() {
    this.msg = 'Registrando...';
    const { usuario, password, passwordreplay } = this.registroGroup.value;

    if (!usuario || !password) {
      this.msg = 'Debe ingresar el nombre y password';
    } else if (!password === passwordreplay) {
    } else {
      this.userService.registro(usuario, password).subscribe(
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
