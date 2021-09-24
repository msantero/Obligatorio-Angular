import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Paquete } from '../paquetes';
import { Venta, VentaResponse } from '../ventas';

import { UserService } from '../user.service';
import { PaqueteService } from '../paquetes.service';
import { VentaService } from '../ventas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nombre_vendedor = this.userService.getUserNombre();
  cant: Number;
  msg: string;

  //el primero es el que carga el combo select para que no quede vacío
  paquete: Paquete = { id: 0 } as Paquete;
  paquetes: Paquete[] = [{ id: 0, nombre: 'Choose one' } as Paquete];

  venta: Venta | undefined;
  ventas: VentaResponse[] = [];

  //para listar los paquetes del vendedor con ventas[] id_paquete debo ir a paquetes[] id (sacar info de: ventas: nombreCliente, cantidadMayores, cantidadMenores, nombreCliente, nombre (paquete) )
  // Paquetes_Vendedor[] = [];
  //paquetes.forEach((paq, pos)=> console.log(`${paq} en posición ${pos}`));

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
    this.obtener_ventas(this.userService.getUserId());
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

  obtener_ventas(idVendedor: number) {
    console.log('Obtengo paquetes...');
    this.ventaService
      .getVentas(this.userService.getApiKey(), idVendedor)
      .subscribe(
        (ventas) => {
          this.ventaService.setVentas(<VentaResponse[]>ventas);
          this.ventas = this.ventaService.ventas;
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

      //creo y cargo objeto para mandar al REST
      //let venta =  Venta;

      this.venta = {
        idVenta: 0,
        idVendedor: this.userService.getUserId(),
        nombreCliente: paqueteAvender?.cliente,
        idPaquete: +paqueteAvender?.paqueteId,
        cantidadMayores: +paqueteAvender?.adultos,
        cantidadMenores: +paqueteAvender?.ninos,
        mensaje: '',
        codigo: 404,
      };

      this.ventaService
        .vender(this.userService.getApiKey(), this.venta)
        .subscribe(
          (vent) => {
            this.ventaService.setVenta(<Venta>vent);
            //this.ventaService.user.usuario = usuario
            this.msg =
              'Venta ingresada con id: ' + this.ventaService.getIdVenta();
          },
          ({ error: { mensaje } }) => {
            this.msg = mensaje;
            console.log('Mensaje de error:' + this.msg);
          }
        );

      this.obtener_ventas(this.userService.getUserId());
    }

    console.log(
      this.msg +
        ' vendedor_id: ' +
        this.userService.getUserId() +
        ' cliente: ' +
        paqueteAvender?.cliente +
        ' adultos: ' +
        paqueteAvender?.adultos +
        ' ninos: ' +
        paqueteAvender?.ninos +
        ' idpaquete: ' +
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
