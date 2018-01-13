import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { MyBottlePage } from '../my-bottle/my-bottle'
import { SendBottlePage } from '../send-bottle/send-bottle';
import { Modal } from 'ionic-angular/components/modal/modal';
import { ChatRoomPage } from '../chat-room/chat-room'

@Component({
  selector: 'page-bottle',
  templateUrl: 'bottle.html'
})
export class BottlePage {

  // 显示捞瓶子弹出层
  isPickUp: Boolean = false;
  // 显示扔瓶子弹出层
  isThrow: Boolean = false;
  // tabIndex
  tabIndex: number = 0;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

  }

  pickUpBottle() {
    let loading = this.loadingCtrl.create({
      content: "捞啊捞...",
      duration: 3000
    })
    loading.present();
    setTimeout(() => {
      this.isPickUp = true;
    }, 3000);
  }

  closeLayer() {
    this.isPickUp = false;
  }

  openSendBottleModal() {
    let mdoal = this.modalCtrl.create(SendBottlePage);
    mdoal.present();
  }

  toChatRoom() {
    // alert('点击被触发');
    this.navCtrl.push(ChatRoomPage);
  }

  checkTab(index) {
    this.tabIndex = index;
  }
}
