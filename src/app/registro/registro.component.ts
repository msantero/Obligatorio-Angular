import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre: string;
  password: string;
  confirmPassword: string;

  constructor() {}

  ngOnInit() {}

  registro() {
    console.log(this.nombre);
    console.log(this.password);
  }
}
