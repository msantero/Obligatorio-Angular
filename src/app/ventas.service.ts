import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Venta } from './ventas';

@Injectable()
export class VentaService {
  ventas: Venta[] = []; //Array<Paquete>;
  codigo: Number;
  idventa: Number;

  private router: Router;

  constructor(private http: HttpClient) {}

  vender(apiKey: string, venta: Venta) {
    const headers = {
      'Content-type': 'application/json',
      apiKey: apiKey,
    };
    const body = JSON.stringify({ venta });
    return this.http.post(
      'https://destinos.develotion.com/usuarios.php',
      body,
      {
        headers,
      }
    );
  }

  getCodigo() {
    return this.codigo;
  }

  setCodigo(codigo_: Number) {
    this.codigo = codigo_;
  }

  getIdVenta() {
    return this.idventa;
  }

  setIdVenta(idventa_: Number) {
    this.idventa = idventa_;
  }
}
