import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenListPageRoutingModule } from './orden-list-routing.module';

import { OrdenListPage } from './orden-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenListPageRoutingModule
  ],
  declarations: [OrdenListPage]
})
export class OrdenListPageModule {}
