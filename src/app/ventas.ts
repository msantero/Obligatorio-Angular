export interface Venta {
  idVenta: number; //devuelve al crear
  idVendedor: number;
  nombreCliente: string;
  idPaquete: number;
  cantidadMayores: number;
  cantidadMenores: number;
  mensaje: string; //devuelve
  codigo: number; //devuelve
}

export interface Ventas {
  id: number;
  vendedor_id: number;
  nombre_cliente: string;
  id_paquete: number;
  cantidad_mayores: number;
  cantidad_menores: number;
}
