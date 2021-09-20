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

  getpaquetes(usuario: string, password: string) {
    const headers = {
      'Content-type': 'application/json',
      apiKey: this.userService.user?.apiKey,
    };
    console.log(this.userService.user?.apiKey);
    //const body = JSON.stringify({ usuario, password });
    return this.http.get('https://destinos.develotion.com/login.php', {
      headers,
      responseType: 'json',
    });
  }

  setPaquetes(paquetes: any) {
    this.paquetes = paquetes;
  }

  getPaquetes() {
    return this.paquetes;
  }
}
