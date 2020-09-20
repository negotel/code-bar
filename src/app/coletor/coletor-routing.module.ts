import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetorPage } from './coletor.page';

const routes: Routes = [
  {
    path: '',
    component: ColetorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetorPageRoutingModule {}
