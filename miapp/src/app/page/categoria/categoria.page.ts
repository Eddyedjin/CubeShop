import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { ProductoService } from '../productos.service';
import { ICategorias } from './model/ICategorias';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  //lista de categorias
  categorias: ICategorias[] = [];

  searchedCategory: ICategorias[] = [];

  constructor(public productService: ProductoService) { }

  ngOnInit() {
    this.leerFirestoreCate();
  }

  leerFirestoreCate() {
    this.productService.getCategoryAll().snapshotChanges() // Usa snapshotChanges para obtener los IDs
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as ICategorias;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      ) // Cambia a getProductAll()
      .subscribe({
        next: (data: any) => {
          console.log("dataFirestone", data);
          this.categorias =  data; // Asigna los datos a 'productos'
          console.log("Categorias: ", this.categorias);
        },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

  
  //Funcion buscar
  /*searchCostumer(event:any){
    //Obtener el texto de búsqueda
    const text = event.target.value;
    //Copiar la lista original de categorias
    this.searchedCategory = this.categorias;
    //Filtrar la lista solo si hay texto y no está vacío
    if(text && text.trim() != ''){
      //Filtrar el nombre de la categoria indicado por el usuario dentro de la lista
      this.searchedCategory = this.searchedCategory.filter((categoria:any)=>{
        //Retornar todos las categorias obtenidas del filtro anterior
        return (categoria.nombre.toLowerCase().indexOf(text.toLowerCase()) >-1);
      })
    }
  }*/

}
