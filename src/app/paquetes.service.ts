import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Paquete } from './paquetes';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PaqueteService {
  paquetes: Paquete[];
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

  setPaquetes(paquetes: any) {
    this.paquetes = paquetes;
  }
}
