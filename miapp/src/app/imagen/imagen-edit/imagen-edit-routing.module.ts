import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenEditPage } from './imagen-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenEditPageRoutingModule {}
