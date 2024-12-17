import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductoEditPage } from './producto-edit.page';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ProductoEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductoEditPage]
})
export class ProductoEditPageModule {}
