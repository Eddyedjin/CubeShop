export interface IProducto {
  id?: string;
  nombre: string;
  descripcion: string;
  color: string;
  precio: number;
  stock: number;
  activo: boolean;
  id_img: number;
  id_tipo: number;
  id_sucursal: number;
}
