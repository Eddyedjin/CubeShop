import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../producto/producto-service.service';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { IProductos } from 'src/app/producto/model/IProductos';
import { IImagenes } from 'src/app/imagen/model/IImagenes';


@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.page.html',
  styleUrls: ['./detalleproducto.page.scss'],
})
export class DetalleproductoPage implements OnInit {
  producto: IProductos | undefined; // Almacena el producto
  imagen: IImagenes | undefined; // Almacena el producto
  id!: string; // Define el ID del producto
  id_img!: string;
  isInWishlist: boolean = false;
  
  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    public restApi: ProductServiceService,
  ) {}

  ngOnInit() {
    // Suscríbete a los parámetros de la ruta para obtener el ID
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || ''; // Obtén el ID de los parámetros de la ruta
      this.getProductDetails();
      
    });
  }

  getProductDetails() {
    // Llama al servicio para obtener los detalles del producto 
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración
  
    if (id) {
      this.restApi.getProductoId(id).subscribe({
        next: (res: IProductos | undefined) => {
          if (res) {
            this.producto = res; // Asigna el resultado a producto
            this.producto.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
            this.getImagenDetails();
          } else {
            console.warn("Producto no encontrado");
          }
        },
        error: (err) => {
          console.error("Error al obtener el producto:", err);
        }
      });
    } else {
      console.warn("ID no encontrado en la ruta");
    }
  }

  //Obtener imagen a partir del producto
  getImagenDetails() {
    // Llama al servicio para obtener los detalles del producto
    const id_img = this.producto?.id_img; // Obtiene el ID de la ruta
    console.log("ID capturado:", id_img); // Para depuración
  
    if (id_img) {
      this.restApi.getImagenId(id_img).subscribe({
        next: (res: IImagenes | undefined) => {
          if (res) {
            this.imagen = res; // Asigna el resultado a imagen
            this.imagen.id = id_img; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
          } else {
            console.warn("Imagen no encontrada");
          }
        },
        error: (err) => {
          console.error("Error al obtener la imagen:", err);
        }
      });
    } else {
      console.warn("ID no encontrado en la ruta");
    }
  }

  aniadirADeseados() {
    this.isInWishlist = !this.isInWishlist; // Cambia el estado al hacer clic
    if (this.isInWishlist) {
      console.log('Producto añadido a la lista de deseados');
    } else {
      console.log('Producto eliminado de la lista de deseados');
    }
  }
}
