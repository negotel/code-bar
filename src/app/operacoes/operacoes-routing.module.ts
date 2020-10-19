import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperacoesPage } from './operacoes.page';

const routes: Routes = [
  {
    path: '',
    component: OperacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperacoesPageRoutingModule {}
