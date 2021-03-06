import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetorPageRoutingModule } from './coletor-routing.module';

import { ColetorPage } from './coletor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetorPageRoutingModule,
  ],
  declarations: [ColetorPage]
})
export class ColetorPageModule {}
