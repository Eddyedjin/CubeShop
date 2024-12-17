import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductos } from '../model/IProductos';
import { ProductServiceService } from '../producto-service.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss'],
})
export class ProductoEditPage implements OnInit {
  productForm!: FormGroup;
  producto: IProductos = {
    id: '',
    nombre: '',
    descripcion: '',
    color: '',
    precio: 0,
    stock: 0,
    activo: true,
    id_img: '',
    id_tipo: '',
    id_sucursal: ''
  };
  id: string = '';

  constructor(
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getProduct();
    } else {
      console.error('No ID found in route params');
    }

    this.productForm = this.formBuilder.group({
      prod_name: ['', Validators.required],
      prod_desc: ['', Validators.required],
      prod_precio: [null, Validators.required],
      prod_color: ['', Validators.required],
      prod_stock: [null, Validators.required],
      prod_id_img: ['', Validators.required],
      prod_id_tipo: ['', Validators.required],
      prod_id_sucursal: ['', Validators.required]
    });
  }

  getProduct() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración

    if (id) {
      this.restApi.getProductoId(id).subscribe({
        next: (res: IProductos | undefined) => {
          if (res) {
            this.producto = res; // Asigna el resultado a producto
            this.producto.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
            this.productForm.setValue({
              prod_name: this.producto.nombre,
              prod_desc: this.producto.descripcion,
              prod_precio: this.producto.precio,
              prod_color: this.producto.color,
              prod_stock: this.producto.stock,
              prod_id_img: this.producto.id_img,
              prod_id_tipo: this.producto.id_tipo,
              prod_id_sucursal: this.producto.id_sucursal
            });
      
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

  async onFormSubmit() {
    if (this.productForm.valid) {
      this.producto.id = this.id;
      this.producto.nombre = this.productForm.value.prod_name;
      this.producto.descripcion = this.productForm.value.prod_desc;
      this.producto.precio = this.productForm.value.prod_precio;
      this.producto.color = this.productForm.value.prod_color;
      this.producto.stock = this.productForm.value.prod_stock;
      this.producto.id_img = this.productForm.value.prod_id_img;
      this.producto.id_tipo = this.productForm.value.prod_id_tipo;
      this.producto.id_sucursal = this.productForm.value.prod_id_sucursal;

      try {
        await this.restApi.updateProducto(this.id, this.producto);
        this.router.navigate(['/producto-list']);
      } catch (error) {
        console.error("Error updating product", error);
      }
    } else {
      console.error("Form is not valid");
    }
  }
}
