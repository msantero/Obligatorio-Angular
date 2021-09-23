import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Venta } from './ventas';
import { Observable } from 'rxjs';

@Injectable()
export class VentaService {
  venta: Venta | undefined;
  ventas: Venta[] = []; //Array<Paquete>;
  codigo: Number;
  idventa: Number;

  private router: Router;

  constructor(private http: HttpClient) {}

  vender(apiKey: string, venta: Venta): Observable<Venta> {
    const headers = {
      'Content-type': 'application/json',
      apiKey: apiKey,
    };
    const body = JSON.stringify({ venta });
    console.log(body);
    return this.http.post<Venta>(
      'https://destinos.develotion.com/ventas.php',
      body,
      {
        headers,
      }
    );
  }

  setVenta(venta: any) {
    this.venta = <Venta>venta;
  }

  getVenta() {
    return this.venta;
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
