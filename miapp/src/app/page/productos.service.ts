import { Injectable } from '@angular/core';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { IProductos } from '../producto/model/IProductos';
import { ICategorias } from './categoria/model/ICategorias';
import { IImagenes } from '../imagen/model/IImagenes';


// creamos Constantes que utilizaremos en el envio
const apiUrlT = "http://localhost:3000/tipo_producto";


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
    providedIn: 'root'
})

export class ProductoService {
//categorias
private dbCollectionCat = "tipo_producto"
private dbDocCat: AngularFirestoreCollection<ICategorias>;

  // Injectamos HttpClient, para poder consular una página
constructor(private http: HttpClient, private firestore: AngularFirestore) {
    //categoria
    this.dbDocCat = this.firestore.collection<ICategorias>(this.dbCollectionCat);
  } 

    //Lista de Cesta
    lCesta = [
        { id: 1, nombre: 'Cubo Rubik 3x3', precio: 10000, imagen: "assets/Placeholder/productos/cuboRubik3x3.png", cantidad: 1, id_categoria: 1 },
        { id: 3, nombre: 'Cubo Rubik 6x6 Gan', precio: 30000, imagen: "assets/Placeholder/productos/cuboRubik6x6.png", cantidad: 1, id_categoria: 1 },
        { id: 2, nombre: 'Cubo Rubik 2x2 Rubiks', precio: 7000, imagen: "assets/Placeholder/productos/cuboRubik2x2.png", cantidad: 1, id_categoria: 1 },
        { id: 4, nombre: 'Cubo Rubik 2x2 Pokemon Koffing', precio: 12000, imagen: "assets/Placeholder/productos/cubo2x2Koffing.png", cantidad: 2, id_categoria: 2 },
    ];

    //Lista de Desedados
    lListaDeseados = [
        { id: 1, nombre: 'Cubo Rubik 2x2 Pokemon Koffing', imagen: 'assets/Placeholder/productos/cubo2x2Koffing.png', precio: 12000, cantidad: 1, id_categoria: 2 },
        { id: 2, nombre: 'Cubo Megaminx Meffert', imagen: 'assets/Placeholder/productos/cuboMegaminxMeffert.png', precio: 50000, cantidad: 1, id_categoria: 1 },
        { id: 3, nombre: 'Cubo Rubik 3x3 Gan356M', imagen: 'assets/Placeholder/productos/cuboRubik3x3Gan365M.png', precio: 60000, cantidad: 1, id_categoria: 1 },
        { id: 4, nombre: 'Cubo Rubik Time Machine', imagen: 'assets/Placeholder/productos/cuboRubikTimeMachine.png', precio: 70000, cantidad: 1, id_categoria: 3 },
        { id: 5, nombre: 'Lubricante Cubo Gan', imagen: 'assets/Placeholder/productos/lubricanteCuboGan.png', precio: 5500, cantidad: 1, id_categoria: 4 },
    ];

    //getter de Cesta
    get obtenerCesta() {
        return this.lCesta;
    }

    //getter de Cesta
    get obtenerDeseados() {
        return this.lListaDeseados;
    }
    // Método para eliminar un producto de la cesta
    eliminarDeCesta(id: number) {
        this.lCesta = this.lCesta.filter(producto => producto.id !== id);
    }

    eliminarDeDeseados(id: number) {
        this.lListaDeseados = this.lListaDeseados.filter(producto => producto.id !== id);
      }
    
      // Método para agregar un producto a la cesta
      agregarACesta(producto: any) {
        this.lCesta.push({ ...producto, cantidad: 1 }); // Asume que solo se agrega una unidad por defecto
      }

  getCategoryAll(): AngularFirestoreCollection<ICategorias> {
    return this.dbDocCat; // Devuelve la colección
  }

}