import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { MyBottlePage } from '../my-bottle/my-bottle'
import { SendBottlePage } from '../send-bottle/send-bottle';
import { Modal } from 'ionic-angular/components/modal/modal';
import { ChatRoomPage } from '../chat-room/chat-room';
import { BottleService } from '../../provider/bottle.service'

@Component({
  selector: 'page-bottle',
  templateUrl: 'bottle.html'
})
export class BottlePage implements OnInit {

  // 显示捞瓶子弹出层
  isPickUp: Boolean = false;
  // 显示扔瓶子弹出层
  isThrow: Boolean = false;
  // tabIndex
  tabIndex: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  isNoReceiversBottles: Boolean = false;
  is
  receiversBottles = [];

  ngOnInit(): void {
    // 获取捞的瓶子
    this.bottleService.getReceiversBottles(this.pageIndex, this.pageSize)
      .then(res => {
        if (!res) this.isNoReceiversBottles = true;
        // this.receiversBottles = res;
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private bottleService: BottleService) {

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
