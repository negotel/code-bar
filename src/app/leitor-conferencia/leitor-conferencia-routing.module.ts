import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeitorConferenciaPage } from './leitor-conferencia.page';

const routes: Routes = [
  {
    path: '',
    component: LeitorConferenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeitorConferenciaPageRoutingModule {}
