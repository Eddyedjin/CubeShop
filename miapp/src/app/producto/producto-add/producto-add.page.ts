import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ProductServiceService } from '../producto-service.service';
import { IProductos } from '../model/IProductos';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.page.html',
  styleUrls: ['./producto-add.page.scss'],
})
export class ProductoAddPage implements OnInit {
  productForm!: FormGroup;

  // Definimos el objeto producto pero no lo inicializamos hasta que el formulario se envíe
  producto: IProductos = {} as IProductos;

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.producto = {
      nombre: '',
      descripcion: '',
      color: '',
      precio: 0,
      stock: 0,
      activo: true,
      id_img: "okcRG4YwEDO4OOZvN63y",  // Valor por defecto
      id_tipo: "SKblgTj5jrHKyE0evzGB", // Valor por defecto
      id_sucursal: "m8o9g5EHqQMxSXRNaSmn" // Valor por defecto
    };

    this.productForm = this.formBuilder.group({
      prod_name: [this.producto.nombre, Validators.required],
      prod_desc: [this.producto.descripcion, Validators.required],
      prod_color: [this.producto.color, Validators.required],
      prod_precio: [this.producto.precio, Validators.required],
      prod_stock: [this.producto.stock, Validators.required],
      prod_activo: [this.producto.activo],
      prod_id_img: [this.producto.id_img, Validators.required],
      prod_id_tipo: [this.producto.id_tipo, Validators.required],
      prod_id_sucursal: [this.producto.id_sucursal, Validators.required],
    });
  }


  async onFormSubmit() {
    console.log("onFormSubmit del Product ADD");

    // Asignamos los valores del formulario al objeto producto
    this.producto = {
      nombre: this.productForm.value.prod_name,
      descripcion: this.productForm.value.prod_desc,
      color: this.productForm.value.prod_color,
      precio: this.productForm.value.prod_precio,
      stock: this.productForm.value.prod_stock,
      activo: this.productForm.value.prod_activo,
      id_img: this.productForm.value.prod_id_img,
      id_tipo: this.productForm.value.prod_id_tipo,
      id_sucursal: this.productForm.value.prod_id_sucursal,
    };

    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    await loading.present();

    try {
      await this.restApi.addProducto(this.producto);
      console.log("Producto agregado con éxito");
      loading.dismiss();
      this.router.navigate(['/producto-list']);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      loading.dismiss();
    }
  }

}
