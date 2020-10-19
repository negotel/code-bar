import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperacoesPageRoutingModule } from './operacoes-routing.module';

import { OperacoesPage } from './operacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperacoesPageRoutingModule
  ],
  declarations: [OperacoesPage]
})
export class OperacoesPageModule {}
