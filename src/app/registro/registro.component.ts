import { Component, OnInit } from '@angular/core';
import { UsuarioAlertsComponent } from '../usuario-alerts/usuario-alerts.component';
import { Usuario } from '../usuarios';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
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
      passwordreplay: ''
    });
  }

  ngOnInit() {}

  /*
  registro() {
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
  registro() {}
  /*
  registro() {
    this.msg = 'Registrando...';

    if (!this.password || !this.usuario) {
      this.msg = 'Debe ingresar el nombre y password';
    }else if{this.password === this.passwordreplay){
        this.msg = 'El password debe ser el mismo que el de la confirmación';
   } else{
      this.msg = "Logueando..."
      const { usuario, password } = this.registroGroup.value;
      this.userService.registro(usuario, password).subscribe(
        user => {
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
   
    console.log(this.msg + "usu y pass ingresado:" + this.usuario + this.password);
    console.log(this.userService.user?.apiKey);
  }
 */
  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}
