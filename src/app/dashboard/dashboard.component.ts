import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Paquete } from '../paquetes';
import { Usuario } from '../usuarios';
import { Venta } from './ventas';

import { UserService } from '../user.service';
import { PaqueteService } from '../paquetes.service';
import { VentaService } from '../ventas.service';
import { Venta } from '../ventas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  msg: string;

  venta: Venta | undefined;
  nombre_vendedor = this.userService.getUserNombre();
  cant: Number;
  /*
  paquetes: Paquete[];
  paquete: Paquete | undefined;
*/

  //el primero es el que carga el combo select para que no quede vacío
  paquete: Paquete = { id: 0 } as Paquete;
  paquetes: Paquete[] = [{ id: 0, nombre: 'Choose one' } as Paquete];

  venderGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private paqueteService: PaqueteService,
    private ventaService: VentaService,
    private router: Router
  ) {
    this.venderGroup = this.formBuilder.group({
      cliente: '',
      adultos: 0,
      ninos: 0,
    });
    this.obtener_paquetes();
  }

  ngOnInit() {}

  obtener_paquetes() {
    console.log('Obtengo paquetes...');
    this.paqueteService.getpaquetes(this.userService.getApiKey()).subscribe(
      (paquets) => {
        /*
        this.paqueteService.setPaquetes(<Paquete[]>paquetes);
        this.paquetes = this.paqueteService.paquetes;
        //console.log('Nombre primer paquete: ' + this.paquetes[0].nombre);
        //console.log('Paquetes: ' + this.paquetes);
        */
        this.paqueteService.setPaquetes(<Paquete[]>paquets);
        this.paquetes = this.paquetes.concat(this.paqueteService.paquetes);
      },
      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error al obtener paquetes: ' + this.msg);
      }
    );
  }

  vender() {
    console.log(this.userService.user?.apiKey);
    //const { cliente, adultos, ninos  } = this.venderGroup.value;
    const paqueteAvender = {
      ...this.venderGroup.value,
      paqueteId: this.paquete.id,
    };

    const valido_cantidad = () => {
      this.cant = +paqueteAvender.adultos + +paqueteAvender.ninos;
      return this.cant <= 10 && this.cant != 0 ? true : false; //parseInt(adultos) es +variable
    };

    if (valido_cantidad() == false) {
      this.msg =
        'Debe ingresar como máximo 10 personas. ' +
        'Cantidad ingresada: ' +
        this.cant;
    } else if (paqueteAvender?.cliente == '') {
      this.msg = 'Debe ingresar cliente' + paqueteAvender?.cliente;
    } else if (!this?.paquete) {
      this.msg = 'Debe seleccionar un paquete';
    } else {
      this.msg = 'Vendiendo...';

      //cargo objeto
      let venta = new Venta();
      venta.vendedor_id = this.userService.getUserId;
      venta.nombre_cliente = this.nombre_vendedor;
      venta.idpaquete = paqueteAvender?.cliente;
      venta.cantidad_mayores = paqueteAvender?.cantidad_mayores;
      venta.cantidad_menores = paqueteAvender?.cantidad_menores;
      

      this.ventaService.vender(venta: Venta).subscribe(
        (venta) => {
          this.userService.setUser(<Usuario>user);
          this.userService.user.usuario = usuario;
          /*
          console.log('User: ' + this.userService.getUserNombre());
          console.log('Id: ' + this.userService.getUserId());
          console.log('Token: ' + this.userService.getApiKey());
          */
          this.router.navigate(['/dashboard'], {
            queryParams: { UserId: this.userService.getUserId() },
          });
        },
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error:' + this.msg);
        }
      );
    }

    console.log(
      this.msg +
        'cli: ' +
        paqueteAvender?.cliente +
        ' adultos: ' +
        paqueteAvender?.adultos +
        ' ninos: ' +
        paqueteAvender?.ninos +
        ' idpaquete:' +
        paqueteAvender?.paqueteId
    );
  }

  parseData(data) {
    if (!data) return {};
    if (typeof data === 'object') return data;
    if (typeof data === 'string') return JSON.parse(data);

    return {};
  }
}
