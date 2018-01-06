import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendBottlePage } from './send-bottle';

@NgModule({
  declarations: [
    SendBottlePage,
  ],
  imports: [
    IonicPageModule.forChild(SendBottlePage),
  ],
})
export class SendBottlePageModule {}
