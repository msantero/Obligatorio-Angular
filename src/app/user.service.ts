import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Usuario } from './usuarios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Usuario;
  private router: Router;
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({ usuario, password });
    return this.http.post('https://destinos.develotion.com/login.php', body, {
      headers,
    });
  }

  registro(usuario: string, password: string) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({ usuario, password });
    return this.http.post(
      'https://destinos.develotion.com/usuarios.php',
      body,
      {
        headers,
      }
    );
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUserId() {
    return this?.user.id;
  }

  getApiKey() {
    return this.user?.apiKey;
  }

  getUserNombre() {
    return this.user?.usuario;
  }

  logOut() {
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
