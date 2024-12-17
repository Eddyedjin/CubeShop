import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SucursalListPageRoutingModule } from './sucursal-list-routing.module';

import { SucursalListPage } from './sucursal-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SucursalListPageRoutingModule
  ],
  declarations: [SucursalListPage]
})
export class SucursalListPageModule {}
