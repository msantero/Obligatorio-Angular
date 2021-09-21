import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from './user.service';

import { Paquete } from './paquetes';

@Injectable({
  providedIn: 'root',
})
export class PaqueteService {
  paquetes: Paquete[]; //Array<Paquete>;
  private router: Router;
  constructor(private http: HttpClient, private userService: UserService) {}

  getpaquetes(apiKey: string) {
    const headers = {
      'Content-type': 'application/json',
      apiKey: apiKey,
    };
    console.log(apiKey);
    //const body = JSON.stringify({ usuario, password });
    return this.http.get('https://destinos.develotion.com/paquetes.php', {
      headers,
      responseType: 'json',
    });
  }

  setPaquetes(paque: any) {
    this.paquetes = JSON.parse(JSON.stringify(paque.destinos));

    for (let element of paque.destinos) {
      this.paquetes.push(new Paquete(element.id, element.nombre));
    }

    // this.paquetes = (Array<Paquete>) JSON.stringify(paquetes.destinos);
    //this.paquetes = paque.destinos; //Array<Paquete>(paque.destinos);
    // console.log('Paquetes set: ' + paque.destinos[1].nombre);
    console.log('Paquetes set: ' + this.paquetes);
    console.log('Paquetes set: ' + this.paquetes[1].nombre);
  }
}
