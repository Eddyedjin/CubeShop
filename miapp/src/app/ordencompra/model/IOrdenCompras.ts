
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
  }


  export interface IUsuario { 
    id?: string;
    nombre: string;
    app: string;
    apm: string;
    correoelectronico: string;
    contrasenia: string;
    id_tipo_user: string; // Cambiado a string
  }
  
export interface IOrdenCompras {
    id?: string;             // ID de la orden (opcional, para Firebase)
    proveedor: string;      // Nombre del proveedor
    fecha_Orden: string;          // Fecha de la orden
    cantidad: number;       // Cantidad del producto
    precioUnitario: number; // Precio unitario del producto
    total: number;          // Total de la orden (cantidad * precioUnitario)
    id_producto: string;    // ID del producto (relacionado con IProductos)
    id_usuario: string;     // ID del producto (relacionado con IUsuario)
    producto?: IProductos | null; // Información adicional del producto, opcional
    usuario?: IUsuario | null; // Información adicional del usuario, opcional
  }