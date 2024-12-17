import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../producto/producto-service.service'; // Asegúrate de la ruta correcta
import { IProductos, ITipoProducto } from '../../producto/model/IProductos'; // Importa la interfaz
import { catchError, debounceTime, forkJoin, map, of, Subject, switchMap } from 'rxjs';
import { LoadingController } from '@ionic/angular'; // Importa LoadingController

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  categorias: any[] = [];
  productos: IProductos[] = [];
  searchedProduct: IProductos[] = [];
  searchSubject: Subject<string> = new Subject(); // Para manejar las búsquedas
  visibleCategories = 2;
  tiposProducto: any[] = []; // Inicializa el array de tipos de producto


  constructor(private productService: ProductServiceService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadTiposProducto();
    this.setupSearch();
  }

  loadTiposProducto() {
    this.productService.getTiposProducto().subscribe({
      next: (res) => {
        this.tiposProducto = res;
        console.log('Tipos de productos:', this.tiposProducto);
      },
      error: (err) => {
        console.error('Error al obtener tipos de productos:', err);
      }
    });
  }

  getCategoria(id_tipo: number): string {
    const tipo = this.tiposProducto.find(t => t.id_tipo === id_tipo);
    return tipo ? tipo.descripcion : 'Desconocido';
  }

  async getProducts() {
    this.productService.getProductAll().snapshotChanges()
      .pipe(
        map((actions: any[]) =>
          actions.map(a => {
            const data = a.payload.doc.data() as IProductos;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      )
      .subscribe({
        next: async (data: IProductos[]) => {
          this.productos = data;
          this.searchedProduct = data;

          const tipoPromises = this.productos.map(producto =>
            this.productService.getTipoProductoPorId(producto.id_tipo).toPromise()
              .catch(() => undefined) // Manejar error
          );

          const tipos = await Promise.all(tipoPromises);

          // Asignar tipos a productos
          this.productos.forEach((producto, index) => {
            producto.tipo = tipos[index] || undefined; // Asignar undefined si no se encuentra tipo
          });

          console.log("Productos con tipo", this.productos);
        },
        error: (err) => {
          console.log("Error al cargar productos", err);
        }
      });
  }

  setupSearch() {
    this.searchSubject.pipe(
      switchMap(text => this.productService.getProductsByName(text))
    ).subscribe({
      next: (data: IProductos[]) => {
        this.searchedProduct = data;
      },
      error: (err) => {
        console.error("Error al buscar productos", err);
      }
    });
  }

  async searchProduct(event: any) {
    const text = event.target.value;
  
    if (text && text.trim() !== '') {
      this.productService.getProductAll().snapshotChanges()
        .pipe(
          map(actions => 
            actions.map(a => {
              const data = a.payload.doc.data() as IProductos;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        )
        .subscribe({
          next: async (data: IProductos[]) => {
            // Filtrar productos basados en coincidencias parciales
            this.searchedProduct = data.filter(producto =>
              producto.nombre.toLowerCase().includes(text.toLowerCase())
            );
  
            const tipoPromises = this.searchedProduct.map(producto => 
              this.productService.getTipoProductoPorId(producto.id_tipo).toPromise()
                .catch(() => undefined)
            );
            //img
            const imgPromises = this.searchedProduct.map(producto => 
              this.productService.getImgPorId(producto.id_img).toPromise()
                .catch(() => undefined)
            );
  
            const tipos = await Promise.all(tipoPromises);
            this.searchedProduct.forEach((producto, index) => {
              producto.tipo = tipos[index] || undefined;
            });
            //img
            const imgid = await Promise.all(imgPromises);
            this.searchedProduct.forEach((producto, index) => {
              producto.img = imgid[index] || undefined;
            });
  
            console.log("Productos buscados con tipo", this.searchedProduct);
            
          },
          error: (err) => {
            console.error("Error al buscar productos", err);
            this.searchedProduct = [];
          }
        });
    } else {
      this.searchedProduct = this.productos; // Reinicia a todos los productos si no hay búsqueda
    }
  }
  





  showMore() {
    this.visibleCategories = this.categorias.length;
  }
}
