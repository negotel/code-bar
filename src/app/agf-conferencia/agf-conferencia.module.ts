import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgfConferenciaPageRoutingModule } from './agf-conferencia-routing.module';

import { AgfConferenciaPage } from './agf-conferencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgfConferenciaPageRoutingModule
  ],
  declarations: [AgfConferenciaPage]
})
export class AgfConferenciaPageModule {}
