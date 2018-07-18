import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembrosPage } from './membros';

@NgModule({
  declarations: [
    MembrosPage,
  ],
  imports: [
    IonicPageModule.forChild(MembrosPage),
  ],
})
export class MembrosPageModule {}
