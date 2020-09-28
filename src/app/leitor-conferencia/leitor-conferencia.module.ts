import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LeitorConferenciaPageRoutingModule } from './leitor-conferencia-routing.module';

import { LeitorConferenciaPage } from './leitor-conferencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeitorConferenciaPageRoutingModule
  ],
  declarations: [LeitorConferenciaPage]
})
export class LeitorConferenciaPageModule {}
