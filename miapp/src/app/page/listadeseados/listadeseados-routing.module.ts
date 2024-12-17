import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadeseadosPage } from './listadeseados.page';

const routes: Routes = [
  {
    path: '',
    component: ListadeseadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadeseadosPageRoutingModule {}
