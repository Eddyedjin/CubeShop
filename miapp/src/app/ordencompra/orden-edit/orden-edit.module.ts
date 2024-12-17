import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenEditPageRoutingModule } from './orden-edit-routing.module';

import { OrdenEditPage } from './orden-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OrdenEditPage]
})
export class OrdenEditPageModule {}
