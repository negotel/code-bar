import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgfConferenciaPage } from './agf-conferencia.page';

const routes: Routes = [
  {
    path: '',
    component: AgfConferenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgfConferenciaPageRoutingModule {}
