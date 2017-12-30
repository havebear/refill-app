import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBottlePage } from './my-bottle';

@NgModule({
  declarations: [
    MyBottlePage,
  ],
  imports: [
    IonicPageModule.forChild(MyBottlePage),
  ],
})
export class MyBottlePageModule {}
