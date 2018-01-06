import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MyBottlePage } from '../my-bottle/my-bottle'
import { SendBottlePage } from '../send-bottle/send-bottle';
import { Modal } from 'ionic-angular/components/modal/modal';

@Component({
  selector: 'page-bottle',
  templateUrl: 'bottle.html'
})
export class BottlePage {

  // 显示捞瓶子弹出层
  isPickUp: Boolean = false;
  // 显示扔瓶子弹出层
  isThrow: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController) {

  }

  openSendBottleModal() {
    let mdoal = this.modalCtrl.create(SendBottlePage);
    mdoal.present();
  }

  throwBottle() {
    this.isThrow = true;
  }

  toMyBottle() {
    this.navCtrl.push(MyBottlePage);
  }

}
