import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Venta } from './ventas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  venta: Venta | undefined;
  ventas: Venta[] = []; //Array<Paquete>;

  private router: Router;

  constructor(private http: HttpClient) {}

  vender(apiKey: string, venta: Venta): Observable<Venta> {
    const headers = {
      'Content-type': 'application/json',
      apiKey: apiKey,
    };
    const body = JSON.stringify(venta);
    return this.http.post<Venta>(
      'https://destinos.develotion.com/ventas.php',
      body,
      {
        headers,
      }
    );
  }

  getVentas(apiKey: string, idVendedor: number): Observable<Venta[]> {
    const headers = {
      'Content-type': 'application/json',
      apiKey: apiKey,
    };
    let params = new HttpParams().set('idVendedor', idVendedor);
    //const body = JSON.stringify({ usuario, password });
    return this.http.get<Venta[]>(
      'https://destinos.develotion.com/ventas.php',
      {
        headers,
        responseType: 'json',
        params: params,
      }
    );
  }

  setVenta(venta: any) {
    this.venta = <Venta>venta;
    /*console.log(
      'venta: ' +
        venta +
        ' ventaobj: ' +
        this.venta +
        ' idventa: ' +
        this.venta.idVenta
    );*/
  }

  getVenta() {
    return this.venta;
  }

  getCodigo() {
    return this.venta?.codigo;
  }

  setCodigo(codigo_: number) {
    this.venta.codigo = codigo_;
  }

  getIdVenta() {
    return this.venta?.idVenta;
  }

  setIdVenta(idventa_: number) {
    this.venta.idVenta = idventa_;
  }
}
