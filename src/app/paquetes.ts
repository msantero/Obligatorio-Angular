export class Paquete {
  id: number;
  nombre: string;
  foto: string;
  precio_mayor: number;
  precio_menor: number;
  constructor(private id_: number, private nombre_: string) {
    let id = id_;
    let nombre = nombre_;
  }
}

//export const paquetes = [];
