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
      paquete_sel: 0,
    });
    this.obtener_paquetes();
  }

  ngOnInit() {}

  obtener_paquetes() {
    console.log('Obtengo paquetes...');
    this.paqueteService.getpaquetes(this.userService.getApiKey()).subscribe(
      (paquetes) => {
        this.paqueteService.setPaquetes(<Paquete[]>paquetes);
        //this.paquete = paquetes[0];
        this.paquetes = this.paqueteService.paquetes;
        //console.log('Nombre primer paquete: ' + this.paquetes[0].nombre);
        //console.log('Paquetes: ' + this.paquetes);
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
    const paqueteAvender = {
      ...this.venderGroup.value,
      paqueteId: this.paquete.id,
    };
    /*
    aca va la validación y despues la llamada por POST.
    */

    const valido_cantidad = () => {
      return +paqueteAvender.adultos + +paqueteAvender.ninos <= 10
        ? true
        : false; //parseInt(adultos) es +variable
    };
    //(isMember ? "$2.00" : "$10.00")

    if (valido_cantidad && paqueteAvender?.cliente != '') {
      console.log(
        'cantidad' +
          (+paqueteAvender.adultos + +paqueteAvender.ninos) +
          ' ' +
          paqueteAvender.adultos +
          ' ' +
          paqueteAvender.ninos
      );
    }

    console.log(
      this.msg +
        'cli: ' +
        paqueteAvender.cliente +
        ' adultos: ' +
        paqueteAvender.adultos +
        ' ninos: ' +
        paqueteAvender.ninos +
        'id:¨' +
        paqueteAvender.paqueteId
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
