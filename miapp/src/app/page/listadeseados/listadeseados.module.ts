import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadeseadosPageRoutingModule } from './listadeseados-routing.module';

import { ListadeseadosPage } from './listadeseados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadeseadosPageRoutingModule
  ],
  declarations: [ListadeseadosPage]
})
export class ListadeseadosPageModule {}
