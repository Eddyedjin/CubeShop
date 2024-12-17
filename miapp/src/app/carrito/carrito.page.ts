import { Component, OnInit } from '@angular/core';
import { CarritoService } from './carrito-service.service';
import { ICarritoItem } from './model/ICarrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss']
})
export class CarritoPage implements OnInit {
  items: ICarritoItem[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  private cargarCarrito() {
    this.items = this.carritoService.obtenerItems();
    this.total = this.carritoService.obtenerTotal();
  }

  eliminarItem(id_producto: string) {
    this.carritoService.eliminarProducto(id_producto);
    this.cargarCarrito();
  }

  procesarCompra() {
    alert('Compra procesada!');
    // Aquí podrías llamar a un método en CarritoService para guardar la orden en Firebase
  }
}
