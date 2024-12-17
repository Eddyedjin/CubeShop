import { IProductos } from '../../producto/model/IProductos';

export interface ICarritoItem {
  producto: IProductos; // Información del producto
  cantidad: number;     // Cantidad de este producto en el carrito
}

export interface ICarrito {
  id_usuario: string;   // ID del usuario propietario del carrito
  items: ICarritoItem[]; // Lista de elementos en el carrito
  total: number;        // Total acumulado del carrito
}