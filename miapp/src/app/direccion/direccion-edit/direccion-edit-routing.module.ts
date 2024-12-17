import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionEditPage } from './direccion-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionEditPageRoutingModule {}


