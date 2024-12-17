import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { IProductos } from '../producto/model/IProductos';
import { ICarrito, ICarritoItem } from './model/ICarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: ICarrito = { id_usuario: '', items: [], total: 0 };

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.authService.usuarioActual$.pipe(
      switchMap(user => {
        if (user) {
          return this.cargarCarrito(user.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe(carrito => {
      this.carrito = carrito || { id_usuario: '', items: [], total: 0 };
    });
  }

  private cargarCarrito(id_usuario: string): Observable<ICarrito | null> {
    return this.firestore.collection('carritos').doc<ICarrito>(id_usuario).valueChanges().pipe(
      switchMap((carrito) => of(carrito || { id_usuario, items: [], total: 0 }))
    );
  }

  agregarProducto(producto: IProductos, cantidad: number) {
    const itemExistente = this.carrito.items.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.carrito.items.push({ producto, cantidad });
    }
    this.actualizarTotal();
    this.guardarCarrito();
  }

  eliminarProducto(id_producto: string) {
    this.carrito.items = this.carrito.items.filter(item => item.producto.id !== id_producto);
    this.actualizarTotal();
    this.guardarCarrito();
  }

  private actualizarTotal() {
    this.carrito.total = this.carrito.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  private guardarCarrito() {
    if (this.carrito.id_usuario) {
      this.firestore.collection('carritos').doc(this.carrito.id_usuario).set(this.carrito);
    }
  }

  obtenerItems(): ICarritoItem[] {
    return this.carrito.items;
  }

  obtenerTotal(): number {
    return this.carrito.total;
  }
}
