export interface IImagen {
  id?: string;
  nombre: string;
  ruta: string;
}

export interface ITipoProducto {
  id: string;
  descripcion: string;
  ruta: string;
}

export interface IProductos {
  id?: string;
  nombre: string;
  descripcion: string;
  color: string;
  precio: number;
  stock: number;
  activo: boolean;
  id_img: string;
  id_tipo: string;
  id_sucursal: string;
  tipo?: ITipoProducto | null; // Agregar esta línea para incluir el tipo de producto
  img?: IImagen | null;
  ruta?: string;
}
