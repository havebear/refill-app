import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from 'ionic-angular';
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
  receiversBottles: any;
  sendBottles: any;
  bottle: any;

  ngOnInit(): void {
    // 获取瓶子列表
    this.bottleService.getReceiversBottles(this.pageIndex, this.pageSize)
      .then(res => {
        if (!res) this.isNoReceiversBottles = true;
        this.receiversBottles = [res];
        return this.bottleService.getSendBottles(this.pageIndex, this.pageSize);
      }).then(res => {
        this.sendBottles = res;
      }).catch(err => {
        console.log(err);
      })
  }

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private bottleService: BottleService,
    private alertCtrl: AlertController) {

  }

  /**
   * 捞瓶子
   */
  pickUpBottle() {
    let loading = this.loadingCtrl.create({
      content: "捞啊捞..."
    })
    loading.present();
    this.bottleService.getBottle().then(res => {
      this.bottle = res;
      loading.dismiss();
      this.isPickUp = true;
    }).catch(err => {
      console.log(err);
      loading.dismiss();
    })
  }

  closeLayer() {
    this.bottleService.thorwBackBottle(this.bottle.id).then(res => {
      console.log(res);
    })
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

  /**
   * 
   * @param item 查看瓶子完整内容
   */
  showBottleInfo(item) {
    this.showAlert(item.content);
  }

  /**
   * 捞瓶子 - 回复
   */
  replyBottle() {
    this.bottleService.replyBottle(this.bottle.id).then(res => {
      console.log(res);
    })
    this.navCtrl.push(ChatRoomPage);
  }

  /**
   * 删除瓶子
   * @param item 
   */
  deleteBottle(item) {
    let confirm = this.alertCtrl.create({
      title: '确认删除',
      message: item.content,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('取消');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('确定');
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: '漂流瓶',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
