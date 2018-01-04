import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyBottlePage } from '../my-bottle/my-bottle'

@Component({
  selector: 'page-bottle',
  templateUrl: 'bottle.html'
})
export class BottlePage {

  // 显示捞瓶子弹出层
  isPickUp: Boolean = false;
  // 显示扔瓶子弹出层
  isThrow: Boolean = false;

  constructor(public navCtrl: NavController) {

  }

  pickUpBottle() {
    this.isPickUp = true;
  }

  throwBottle() {
    this.isThrow = true;
  }

  toMyBottle() {
    this.navCtrl.push(MyBottlePage);
  }

}
