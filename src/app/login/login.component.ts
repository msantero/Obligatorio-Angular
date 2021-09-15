import { Component, OnInit } from '@angular/core';
import { UsuarioAlertsComponent } from '../usuario-alerts/usuario-alerts.component';
import { Usuario } from '../usuarios';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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

  //loginGroup;
  //errMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  /*
  this.loginGroup = this.formBuilder.group({
    usuario: '',
    password: ''
  });
*/

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

  formSubmit() {
    //const {usuario, passord} = this.loginGroup.value
    //console.log(usuario);
    //console.log(password);
    /*
    this.userService.login(usuario, password).subscribe(user => {
      this.userService.setUser(user);
      console.log(user);
    });
    ({ error: { mensaje}}}) => {
       this.errMsg = mensaje;
    }

    
    */
    this.router.navigate(['/dashboard']);
  }

  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}
