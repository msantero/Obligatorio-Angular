import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  msg: string;

  venderGroup: FormGroup;
  constructor() {
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  }

  ngOnInit() {}

  vender() {
    this.msg = 'Vendiendo...';
    const { cliente, adultos, ninos } = this.venderGroup.value;
    /*
    if (!usuario || !password) {
      this.msg = 'Debe ingresar el nombre y password';
    } else {
      this.userService.login(usuario, password).subscribe(
        (user) => {
          this.userService.setUser(user);
          console.log(user);
          this.router.navigate(['/dashboard'], {
            queryParams: { apiKey: this.userService.getApiKey },
          });
        },
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error:' + this.msg);
        }
      );
    }
*/
    console.log(this.msg + 'cli: ' + cliente + ' adultos: ' + adultos + ' ninos: ' + ninos);
    console.log(this.userService.user?.apiKey);
  }
}
