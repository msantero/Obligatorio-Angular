export interface Usuario {
  id: number;
  nombre: string;
  password: string;
  token: string;
}

export const usuarios = [
  {
    id: 1,
    nombre: 'Marcos',
    password: '123',
    token: 'dfgdfg'
  },
  {
    id: 1,
    nombre: 'Pedro',
    password: '456',
    token: 'sdfsdffff'
  }
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
