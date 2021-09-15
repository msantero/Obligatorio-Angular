import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user;
  private router: Router;
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({ usuario, password });
    this.http.post('https://destinos.develotion.com/login.php', body, {
      headers
    });
  }

  setUser(user: any) {
    this.user = user;
  }

  getUserId() {
    //return this.user.id;
  }

  logOut() {
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
