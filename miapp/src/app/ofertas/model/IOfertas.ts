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

export interface IOfertas {
    id?: string;
    nombre: string;
    descuento: number;   // Porcentaje de descuento
    fechaInicio: string;   // Fecha de inicio de la oferta
    fechaFin: string;      // Fecha de fin de la oferta
    id_producto: string; // Relación con el producto
    producto?: IProductos | null; 
    img?: IImagen | null;
  }