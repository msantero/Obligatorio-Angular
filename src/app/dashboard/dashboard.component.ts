import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Paquete } from '../paquetes';
import { UserService } from '../user.service';
import { PaqueteService } from '../paquetes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  msg: string;
  //seleccionado: string;
  nombre_vendedor = this.userService.getUserNombre();

  paquetes: Paquete[];
  paquete: Paquete | undefined;

  venderGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private paqueteService: PaqueteService,
    private router: Router
  ) {
    this.venderGroup = this.formBuilder.group({
      cliente: '',
      adultos: 0,
      ninos: 0,
      paquete_sel: 1,
    });
    this.obtener_paquetes();
  }

  ngOnInit() {}

  obtener_paquetes() {
    console.log('Obtengo paquetes...');
    this.paqueteService.getpaquetes(this.userService.getApiKey()).subscribe(
      (paquetes) => {
        this.paqueteService.setPaquetes(<Paquete[]>paquetes);
        this.paquete = paquetes[0];
        this.paquetes = this.paqueteService.paquetes;
        console.log('Nombre primer paquete: ' + this.paquetes[1].nombre);
        console.log('Paquetes: ' + this.paquetes);
      },
      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error:' + this.msg);
      }
    );
  }

  vender() {
    this.msg = 'Vendiendo...';
    //const { cliente, adultos, ninos  } = this.venderGroup.value;
    const paqueteAvender = {...this.venderGroup.value, paqueteId: this.paquete.id}
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
    console.log(
      this.msg + 'cli: ' + paqueteAvender.cliente + ' adultos: ' + paqueteAvender.adultos + ' ninos: ' + paqueteAvender.ninos + 'id:¨'+paqueteAvender.paqueteId
    );
    console.log(this.userService.user?.apiKey);
  }

  parseData(data) {
    if (!data) return {};
    if (typeof data === 'object') return data;
    if (typeof data === 'string') return JSON.parse(data);

    return {};
  }
}
